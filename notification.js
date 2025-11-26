      
// Notification System for UNKLAB Store
class NotificationSystem {
    constructor() {
        this.notifications = [];
        this.init();
    }

    init() {
        this.loadNotifications();
        this.showWelcomeNotification();
        this.scheduleNotifications();
        this.startBellRingAnimation();
    }

    // Load notifications from localStorage or set defaults
    loadNotifications() {
        const stored = localStorage.getItem('unklab_notifications');
        if (stored) {
            this.notifications = JSON.parse(stored);
        } else {
            // Default notifications
            this.notifications = [
                {
                    id: 'welcome',
                    type: 'info',
                    title: 'Selamat Datang!',
                    message: 'Terima kasih telah mengunjungi UNKLAB Store. Temukan produk terbaik kami!',
                    shown: false,
                    autoShow: true,
                    read: false
                },
                {
                    id: 'new_product',
                    type: 'success',
                    title: 'Produk Baru!',
                    message: 'Kaos UNKLAB edisi terbatas sekarang tersedia. Cek sekarang!',
                    shown: false,
                    autoShow: true,
                    delay: 5000, // Show after 5 seconds
                    read: false
                },
                {

                    type: 'warning',
                    title: 'Promo Spesial!',
                    message: 'Diskon 20% untuk semua produk gadget. Promo berlaku hingga akhir bulan!',
                    shown: false,
                    autoShow: true,
                    delay: 10000, // Show after 10 seconds
                    read: false
                },
                {
                    id: 'order_confirm',
                    type: 'success',
                    title: 'Pesanan Dikonfirmasi!',
                    message: 'Pesanan Anda telah berhasil diproses. Kami akan segera mengirimkan konfirmasi via email.',
                    shown: false,
                    autoShow: false, // Only show after order
                    read: false
                }
            ];
            this.saveNotifications();
        }
    }
    saveNotifications() {
        localStorage.setItem('unklab_notifications', JSON.stringify(this.notifications));
    }

    // Show welcome notification on first visit
    showWelcomeNotification() {
        const welcomeNotif = this.notifications.find(n => n.id === 'welcome' && !n.shown);
        if (welcomeNotif) {
            setTimeout(() => {
                this.showNotification(welcomeNotif);
                welcomeNotif.shown = true;
                this.saveNotifications();
            }, 2000); // Show after 2 seconds
        }
    }

    // Schedule automatic notifications
    scheduleNotifications() {
        this.notifications.forEach(notification => {
            if (notification.autoShow && !notification.shown && notification.delay) {
                setTimeout(() => {
                    if (!notification.shown) {
                        this.showNotification(notification);
                        notification.shown = true;
                        this.saveNotifications();
                    }
                }, notification.delay);
            }
        });
    }

    // Show a specific notification
    showNotification(notification) {
        const toast = document.createElement('div');
        toast.className = `notification-toast ${notification.type}`;
        toast.innerHTML = `
            <div class="notification-content">
                <div class="notification-header">
                    <strong>${notification.title}</strong>
                    <button class="notification-close" onclick="notificationSystem.closeNotification('${notification.id}')">&times;</button>
                </div>
                <div class="notification-body">
                    ${notification.message}
                </div>
            </div>
        `;

        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => toast.classList.add('show'), 100);

        // Auto remove after 8 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.classList.remove('show');
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                }, 400);
            }
        }, 8000);
    }

    // Close notification manually
    closeNotification(id) {
        const notification = this.notifications.find(n => n.id === id);
        if (notification) {
            notification.shown = true;
            this.saveNotifications();
        }

        const toast = document.querySelector(`.notification-toast`);
        if (toast) {
            toast.classList.remove('show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 400);
        }
    }

    // Trigger order confirmation notification
    showOrderConfirmation() {
        const orderNotif = this.notifications.find(n => n.id === 'order_confirm');
        if (orderNotif && !orderNotif.shown) {
            this.showNotification(orderNotif);
            orderNotif.shown = true;
            this.saveNotifications();
        }
    }

    // Add custom notification (for future use)
    addNotification(notification) {
        notification.id = Date.now().toString();
        notification.shown = false;
        this.notifications.push(notification);
        this.saveNotifications();
        this.showNotification(notification);
        this.updateNotificationCount();
        this.triggerBellRing(); // Trigger bell ring when new notification is added
    }

    // Mark notification as read
    markAsRead(notificationId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification && !notification.read) {
            notification.read = true;
            this.saveNotifications();
            this.updateNotificationCount();
        }
    }

    // Update notification count badge
    updateNotificationCount() {
        const unreadCount = this.notifications.filter(n => !n.read).length;
        const countElement = document.getElementById('notificationCount');
        if (countElement) {
            countElement.textContent = unreadCount;
            countElement.style.display = unreadCount > 0 ? 'block' : 'none';
        }
    }

    // Show notification dropdown
    showNotificationDropdown() {
        const dropdown = document.getElementById('notificationDropdown');
        if (!dropdown) return;

        // Clear existing items
        const items = dropdown.querySelectorAll('.notification-item-li');
        items.forEach(item => item.remove());

        // Add notification items
        const noNotifications = document.getElementById('noNotifications');
        if (this.notifications.length === 0) {
            noNotifications.style.display = 'block';
            noNotifications.innerHTML = `
                <i class="fas fa-bell-slash"></i>
                <div>Tidak ada notifikasi</div>
            `;
        } else {
            noNotifications.style.display = 'none';

            this.notifications.forEach(notification => {
                const item = document.createElement('li');
                item.className = `dropdown-item notification-item-li ${!notification.read ? 'notification-unread' : ''}`;
                item.onclick = () => {
                    this.showNotification(notification);
                    this.markAsRead(notification.id);
                };

                const iconClass = this.getNotificationIcon(notification.type);

                item.innerHTML = `
                    <div class="notification-item">
                        <i class="${iconClass} notification-icon"></i>
                        <div class="notification-content">
                            <div class="notification-title">${notification.title}</div>
                            <div class="notification-message">${notification.message}</div>
                            <div class="notification-status">${notification.read ? 'Dibaca' : 'Baru'}</div>
                        </div>
                    </div>
                `;

                dropdown.appendChild(item);
            });
        }
    }

    // Get icon class based on notification type
    getNotificationIcon(type) {
        switch (type) {
            case 'success': return 'fas fa-check-circle';
            case 'error': return 'fas fa-exclamation-triangle';
            case 'warning': return 'fas fa-exclamation-circle';
            case 'info': return 'fas fa-info-circle';
            default: return 'fas fa-bell';
        }
    }

    // Show custom notification when button is clicked
    showCustomNotification() {
        const customNotification = {
            id: 'custom_' + Date.now(),
            type: 'info',
            title: 'Notifikasi Kustom!',
            message: 'Ini adalah notifikasi kustom dari tombol notifikasi. Terima kasih telah mencoba fitur ini!',
            shown: false,
            autoShow: false
        };
        this.showNotification(customNotification);
    }

    // Trigger bell ring animation
    triggerBellRing() {
        const bellIcon = document.querySelector('.notification-bell-icon');
        if (bellIcon) {
            bellIcon.classList.add('bell-ring');
            setTimeout(() => {
                bellIcon.classList.remove('bell-ring');
            }, 600);
        }
    }

    // Start automatic bell ring animation for unread notifications
    startBellRingAnimation() {
        // Trigger bell ring every 30 seconds if there are unread notifications
        setInterval(() => {
            const unreadCount = this.notifications.filter(n => !n.read).length;
            if (unreadCount > 0) {
                this.triggerBellRing();
            }
        }, 30000);
    }
}

// Initialize notification system
const notificationSystem = new NotificationSystem();

// Enhanced Toast Function (from existing script)
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <span>${message}</span>
            <button class="toast-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 400);
    }, 4000);
}

// Add event listener for notification button
document.addEventListener('DOMContentLoaded', function() {
    const notificationBtn = document.getElementById('notificationBtn');
    if (notificationBtn) {
        // Change event listener to show dropdown instead of custom notification
        notificationBtn.addEventListener('click', function() {
            notificationSystem.showNotificationDropdown();
        });
    }

    // Initialize notification count on page load
    notificationSystem.updateNotificationCount();
});

// Integrate with existing checkout process
function processCheckout() {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const confirmBtn = document.getElementById('confirmCheckoutBtn');
    const originalText = confirmBtn.textContent;

    // Check if this is a direct buy or from cart
    const tempCart = JSON.parse(localStorage.getItem('tempCart')) || null;
    const isDirectBuy = tempCart !== null;

    // Disable button and show processing
    confirmBtn.disabled = true;
    confirmBtn.textContent = 'Memproses...';

    // Show progress notification
    showToast('Memproses pembayaran...', 'info');

    // Simulate payment processing with progress updates
    setTimeout(() => {
        showToast('Memverifikasi pembayaran...', 'info');
    }, 500);

    setTimeout(() => {
        showToast('Mengirim konfirmasi...', 'info');
    }, 1000);

    setTimeout(() => {
        if (paymentMethod === 'transfer') {
            showToast('Pesanan berhasil! Silakan transfer ke rekening yang tertera. Konfirmasi akan dikirim via email.', 'success');
            setTimeout(() => {
                showToast('Email konfirmasi telah dikirim! Periksa inbox Anda.', 'success');
            }, 1000);
        } else {
            showToast('Pesanan berhasil! Kurir akan menghubungi Anda untuk pengiriman.', 'success');
            setTimeout(() => {
                showToast('SMS konfirmasi telah dikirim! Kurir akan segera menghubungi.', 'success');
            }, 1000);
        }

        // Show order confirmation notification
        notificationSystem.showOrderConfirmation();

        // Clear cart or temp cart
        if (isDirectBuy) {
            localStorage.removeItem('tempCart');
        } else {
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        }

        // Close modal and reset form
        bootstrap.Modal.getInstance(document.getElementById('checkoutModal'))?.hide();
        document.getElementById('checkoutForm').reset();

        // Reset button
        confirmBtn.disabled = false;
        confirmBtn.textContent = originalText;
    }, 2000); // 2 second delay for simulation
}
