// Wishlist disabled: no-op implementation to avoid runtime errors
(function(){
    function getWishlist(){ return []; }
    function toggleWishlist(){ /* wishlist feature disabled */ }
    function saveWishlist(){ /* noop */ }
    function removeFromWishlist(){ /* noop */ }
    window.wishlistSystem = { getWishlist, toggleWishlist };
    // remove any UI elements previously injected (safety)
    document.addEventListener('DOMContentLoaded', ()=>{
        document.querySelectorAll('.wishlist-toggle, .wishlist-btn, #wishlistBtn, #wishlistCount').forEach(el=>{
            if (el && el.remove) el.remove();
        });
    });
})();