document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-approve').forEach(button => {
        button.addEventListener('click', () => {
            const requestId = button.dataset.id;
            fetch('/admin/api/approve_leave', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ requestID: requestId })
            })
            .then(response => {
                if (response.ok) {
                    location.reload();
                } else {
                    alert('Failed to approve leave request.');
                }
            });
        });
    });

    // Event handler for rejecting leave requests
    //chatgpt used here
    document.querySelectorAll('.btn-reject').forEach(button => {
        button.addEventListener('click', () => {
            const requestId = button.dataset.id;
            fetch('/admin/api/remove_leave', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ requestID: requestId })
            })
            .then(response => {
                if (response.ok) {
                    location.reload();
                } else {
                    alert('Failed to reject leave request.');
                }
            });
        });
    });

    // Event handler for applying leave
    const applyLeaveForm = document.getElementById('applyLeaveForm');
    if (applyLeaveForm) {
        applyLeaveForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(applyLeaveForm);
            fetch('/leave/apply', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    window.location.href = '/leave/status';
                } else {
                    alert('Failed to apply for leave.');
                }
            });
        });
    }

    // Event handler for login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(loginForm);
            fetch('/login', {
                method: 'POST',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        if (data.role === 'admin') {
                            window.location.href = '/admin/dashboard';
                        } else {
                            window.location.href = '/home';
                        }
                    });
                } else {
                    alert('Login failed. Please check your credentials.');
                }
            });
        });
    }
});
