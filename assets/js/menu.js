// assets/js/menu.js

document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle Logic
    const themeBtn = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Set initial icon visibility based on current theme
    const currentTheme = html.getAttribute('data-theme') || 'dark';
    updateThemeIcon(currentTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeBtn) return;
        if (theme === 'dark') {
            themeBtn.classList.remove('theme-light');
            themeBtn.classList.add('theme-dark');
        } else {
            themeBtn.classList.remove('theme-dark');
            themeBtn.classList.add('theme-light');
        }
    }

    // Login Form logic
    const loginForm = document.getElementById('loginForm');
    const recoveryForm = document.getElementById('recoveryForm');
    const btnForgot = document.querySelector('.forgot-password');
    const btnBackToLogin = document.getElementById('backToLogin');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const profile = document.querySelector('input[name="profile"]:checked').value;
            // Redirect based on selected profile
            window.location.href = `pages/dashboard-${profile}.html`;
        });
    }

    // Toggle Recovery vs Login
    if (btnForgot && recoveryForm && loginForm) {
        btnForgot.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.style.display = 'none';
            recoveryForm.style.display = 'flex';
            recoveryForm.style.flexDirection = 'column';
            recoveryForm.style.animation = 'fadeIn 0.3s ease';
        });
    }

    if (btnBackToLogin && recoveryForm && loginForm) {
        btnBackToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            recoveryForm.style.display = 'none';
            loginForm.style.display = 'flex';
            loginForm.style.flexDirection = 'column';
            loginForm.style.animation = 'fadeIn 0.3s ease';
        });
    }

    if (recoveryForm) {
        recoveryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Um e-mail de recuperação foi enviado se o endereço estiver cadastrado em nossa base.');
            btnBackToLogin.click();
        });
    }

    // Sidebar mechanics for dashboard pages
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const closeSidebarBtn = document.getElementById('closeSidebar');

    function openSidebar() {
        if (sidebar) sidebar.classList.add('active');
        if (sidebarOverlay) sidebarOverlay.classList.add('active');
    }

    function closeSidebar() {
        if (sidebar) sidebar.classList.remove('active');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', openSidebar);
    }

    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', closeSidebar);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    // Tab mechanics for dashboards
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length > 0 && tabContents.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active from all
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // Add active to clicked
                btn.classList.add('active');
                const targetId = btn.getAttribute('data-tab');
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }

                // Sync with sidebar menu item if exists
                const simMenuItems = document.querySelectorAll('.menu-item');
                if (simMenuItems.length > 0) {
                    simMenuItems.forEach(mi => mi.classList.remove('active'));
                    const matchingMenuItem = document.querySelector(`.menu-item[data-tab="${targetId}"]`);
                    if (matchingMenuItem) {
                        matchingMenuItem.classList.add('active');
                    }
                }
            });
        });
    }

    // Sidebar menu navigation (simulated visual effect)
    const menuItems = document.querySelectorAll('.menu-item');
    if (menuItems.length > 0) {
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                // Ignore if it's logout button
                if (item.classList.contains('logout-btn')) {
                    window.location.href = '../index.html';
                    return;
                }

                // Set active item visually
                menuItems.forEach(mi => mi.classList.remove('active'));
                item.classList.add('active');

                // Close sidebar after clicking an item 
                // Always close it because the sidebar hides by default on all screens
                if (!item.classList.contains('has-submenu')) {
                    closeSidebar();
                }

                // If menu item has data-tab, switch to that tab
                const targetId = item.getAttribute('data-tab');
                if (targetId) {
                    const tabBtn = document.querySelector(`.tab-btn[data-tab="${targetId}"]`);
                    if (tabBtn) {
                        tabBtn.click();
                    } else {
                        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                        const targetContent = document.getElementById(targetId);
                        if (targetContent) targetContent.classList.add('active');
                    }
                }
            });
        });
    }
});
