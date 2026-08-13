/**
 * TEMIMA CABINETS - MODERN E-COMMERCE APPLICATION ENGINE
 * Desktop & Mobile responsive engine, template switcher, mobile drawer navigation,
 * interactive cabinet visualizer, 4-step quote wizard, cart management, and guest checkout.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const AppState = {
    currentTemplate: 'home',
    viewportMode: 'desktop',
    cart: [
      {
        id: 'shaker-white-b30',
        name: 'Classic White Shaker Base Cabinet 30"',
        sku: 'TC-WS-B30',
        finish: 'Alpine White',
        size: '30" W x 34.5" H x 24" D',
        hinge: 'Soft-Close Right',
        price: 349.00,
        qty: 2,
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'navy-wall-w36',
        name: 'Horizon Navy Wall Cabinet 36"',
        sku: 'TC-HN-W36',
        finish: 'Horizon Navy',
        size: '36" W x 30" H x 12" D',
        hinge: 'Soft-Close Left',
        price: 429.00,
        qty: 1,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
      }
    ],
    quoteData: {
      step: 1,
      projectType: 'Kitchen Remodel',
      style: 'Shaker',
      finish: 'Alpine White',
      roomWidth: 14,
      roomLength: 12,
      countertop: 'Quartz',
      fileUploaded: false,
      fullName: '',
      email: '',
      phone: '',
      notes: ''
    },
    discount: 0,
    freeShippingThreshold: 1000.00
  };

  // DOM Handles
  const viewportFrame = document.getElementById('viewportFrame');
  const templateButtons = document.querySelectorAll('.template-btn');
  const viewportButtons = document.querySelectorAll('.viewport-btn');
  const pageViews = document.querySelectorAll('.page-view');
  const cartBadgeCounts = document.querySelectorAll('.cart-count');
  const toastContainer = document.getElementById('toastContainer');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mainNav = document.querySelector('.main-nav');

  // ==========================================
  // 1. MOBILE MENU TOGGLE DRAWER
  // ==========================================
  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mainNav.classList.toggle('mobile-active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.className = mainNav.classList.contains('mobile-active') ? 'fas fa-times' : 'fas fa-bars';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mainNav.classList.remove('mobile-active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      }
    });
  }

  // ==========================================
  // 2. TEMPLATE & VIEWPORT SWITCHER LOGIC
  // ==========================================
  function switchTemplate(templateId) {
    AppState.currentTemplate = templateId;

    // Close mobile nav drawer
    if (mainNav) mainNav.classList.remove('mobile-active');
    if (mobileMenuBtn) {
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
    }

    // Active button state
    templateButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.template === templateId);
    });

    // Active nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active-link', link.dataset.targetTemplate === templateId);
    });

    // Toggle views
    pageViews.forEach(view => {
      view.style.display = (view.id === `template-${templateId}`) ? 'block' : 'none';
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Refresh view states
    if (templateId === 'cart') renderCartPage();
    if (templateId === 'checkout') renderCheckoutPage();
  }

  templateButtons.forEach(btn => {
    btn.addEventListener('click', () => switchTemplate(btn.dataset.template));
  });

  // Header Nav Router
  document.querySelectorAll('[data-target-template]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      switchTemplate(el.dataset.targetTemplate);
    });
  });

  // Desktop vs Mobile Viewport Switcher
  viewportButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      AppState.viewportMode = mode;
      viewportButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (mode === 'mobile') {
        viewportFrame.classList.add('mobile-mode');
        showToast('📱 Switched to Mobile Viewport Simulator', 'info');
      } else {
        viewportFrame.classList.remove('mobile-mode');
        showToast('💻 Switched to Desktop Layout Viewport', 'info');
      }
    });
  });

  // ==========================================
  // 3. TOAST NOTIFICATIONS
  // ==========================================
  function showToast(message, type = 'success') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-info-circle';
    toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ==========================================
  // 4. TEMPLATE 1: HOME PAGE WIDGETS
  // ==========================================
  const swatchBtns = document.querySelectorAll('.swatch-btn');
  const visualizerImg = document.getElementById('visualizerPreviewImg');
  const visualizerTitle = document.getElementById('visualizerTitle');

  const finishImages = {
    white: { img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80', title: 'Alpine White Shaker' },
    navy: { img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', title: 'Horizon Navy Modern' },
    espresso: { img: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80', title: 'Craftsman Espresso Oak' },
    oak: { img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80', title: 'Natural Warm Oak Slab' }
  };

  swatchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      swatchBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      const colorKey = btn.dataset.color;
      if (finishImages[colorKey] && visualizerImg) {
        visualizerImg.style.opacity = '0.3';
        setTimeout(() => {
          visualizerImg.src = finishImages[colorKey].img;
          visualizerImg.style.opacity = '1';
          if (visualizerTitle) visualizerTitle.textContent = finishImages[colorKey].title;
        }, 150);
      }
    });
  });

  // ==========================================
  // 5. TEMPLATE 2: SHOP FILTERS
  // ==========================================
  const productCards = document.querySelectorAll('.shop-product-card');
  const resultsCount = document.getElementById('resultsCount');

  function filterShopProducts() {
    let visibleCount = 0;
    const selectedStyles = Array.from(document.querySelectorAll('.filter-style-check:checked')).map(cb => cb.value);
    const selectedFinishes = Array.from(document.querySelectorAll('.filter-finish-check:checked')).map(cb => cb.value);

    productCards.forEach(card => {
      const cardStyle = card.dataset.style;
      const cardFinish = card.dataset.finish;

      const matchesStyle = selectedStyles.length === 0 || selectedStyles.includes(cardStyle);
      const matchesFinish = selectedFinishes.length === 0 || selectedFinishes.includes(cardFinish);

      if (matchesStyle && matchesFinish) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (resultsCount) resultsCount.textContent = `Showing ${visibleCount} products`;
  }

  document.querySelectorAll('.filter-checkbox').forEach(cb => {
    cb.addEventListener('change', filterShopProducts);
  });

  const clearFiltersBtn = document.getElementById('clearFiltersBtn');
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', () => {
      document.querySelectorAll('.filter-checkbox').forEach(cb => cb.checked = false);
      filterShopProducts();
      showToast('Filters reset', 'info');
    });
  }

  // ==========================================
  // 6. TEMPLATE 3: SINGLE PRODUCT CONFIGURATOR
  // ==========================================
  const mainGalleryImg = document.getElementById('mainGalleryImg');
  const galleryThumbs = document.querySelectorAll('.thumb-item');
  const sizeBtns = document.querySelectorAll('.size-btn');
  const hingeRadios = document.querySelectorAll('.hinge-pill');
  const dynamicProductPrice = document.getElementById('dynamicProductPrice');
  const productQtyInput = document.getElementById('productQtyInput');
  const addToCartSingleBtn = document.getElementById('addToCartSingleBtn');
  const mobileAddToCartSingleBtn = document.getElementById('mobileAddToCartSingleBtn');

  galleryThumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      galleryThumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      if (mainGalleryImg) mainGalleryImg.src = thumb.dataset.img;
    });
  });

  let selectedBasePrice = 349.00;
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedBasePrice = parseFloat(btn.dataset.price);
      if (dynamicProductPrice) dynamicProductPrice.textContent = `$${selectedBasePrice.toFixed(2)}`;
    });
  });

  hingeRadios.forEach(radio => {
    radio.addEventListener('click', () => {
      hingeRadios.forEach(r => r.classList.remove('selected'));
      radio.classList.add('selected');
    });
  });

  function handleAddToCart() {
    const selectedSizeBtn = document.querySelector('.size-btn.selected');
    const selectedHinge = document.querySelector('.hinge-pill.selected')?.dataset.hinge || 'Right';
    const qty = parseInt(productQtyInput?.value || 1);

    const newItem = {
      id: `custom-shaker-${Date.now()}`,
      name: `Classic White Shaker Base Cabinet ${selectedSizeBtn?.dataset.size || '30"'}`,
      sku: `TC-WS-B${selectedSizeBtn?.dataset.size?.replace('"', '') || '30'}`,
      finish: 'Alpine White',
      size: `${selectedSizeBtn?.dataset.size || '30"'} W x 34.5" H x 24" D`,
      hinge: `Soft-Close ${selectedHinge}`,
      price: selectedBasePrice,
      qty: qty,
      image: mainGalleryImg?.src || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80'
    };

    AppState.cart.push(newItem);
    updateCartCount();
    showToast(`Added ${qty}x ${newItem.name} to Cart!`);
  }

  if (addToCartSingleBtn) addToCartSingleBtn.addEventListener('click', handleAddToCart);
  if (mobileAddToCartSingleBtn) mobileAddToCartSingleBtn.addEventListener('click', handleAddToCart);

  // Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const tabTarget = document.getElementById(`tab-${btn.dataset.tab}`);
      if (tabTarget) tabTarget.classList.add('active');
    });
  });

  // ==========================================
  // 7. TEMPLATE 4: MULTI-STEP QUOTE WIZARD
  // ==========================================
  const wizardPanes = document.querySelectorAll('.wizard-step-pane');
  const wizardStepBadges = document.querySelectorAll('.wizard-header-steps .step-item');
  const wizardNextBtn = document.getElementById('wizardNextBtn');
  const wizardPrevBtn = document.getElementById('wizardPrevBtn');
  const typeSelectCards = document.querySelectorAll('.type-select-card');
  const fileDropzone = document.getElementById('fileDropzone');

  function updateWizardStep(stepNum) {
    AppState.quoteData.step = stepNum;
    wizardPanes.forEach((pane, idx) => {
      pane.classList.toggle('active', idx + 1 === stepNum);
    });

    wizardStepBadges.forEach((badge, idx) => {
      badge.classList.toggle('active', idx + 1 <= stepNum);
    });

    if (wizardPrevBtn) wizardPrevBtn.style.visibility = (stepNum === 1) ? 'hidden' : 'visible';
    if (wizardNextBtn) {
      if (stepNum === 4) {
        wizardNextBtn.innerHTML = `Submit Quote Request <i class="fas fa-paper-plane"></i>`;
      } else {
        wizardNextBtn.innerHTML = `Next Step <i class="fas fa-arrow-right"></i>`;
      }
    }
  }

  typeSelectCards.forEach(card => {
    card.addEventListener('click', () => {
      typeSelectCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      AppState.quoteData.projectType = card.dataset.type;
    });
  });

  if (fileDropzone) {
    fileDropzone.addEventListener('click', () => {
      AppState.quoteData.fileUploaded = true;
      fileDropzone.style.borderColor = '#10B981';
      fileDropzone.style.background = 'rgba(16, 185, 129, 0.08)';
      fileDropzone.innerHTML = `
        <i class="fas fa-file-circle-check" style="color:#10B981; font-size:2.5rem;"></i>
        <h4 style="color:#10B981; margin-top:0.5rem;">Kitchen_Layout_Plan_v2.pdf Attached</h4>
        <p style="font-size:0.85rem; color:#6B7280;">File ready for CAD design team (2.4 MB)</p>
      `;
      showToast('Floor plan sketch attached!');
    });
  }

  if (wizardNextBtn) {
    wizardNextBtn.addEventListener('click', () => {
      if (AppState.quoteData.step < 4) {
        updateWizardStep(AppState.quoteData.step + 1);
      } else {
        submitQuoteToCRM();
      }
    });
  }

  if (wizardPrevBtn) {
    wizardPrevBtn.addEventListener('click', () => {
      if (AppState.quoteData.step > 1) {
        updateWizardStep(AppState.quoteData.step - 1);
      }
    });
  }

  function submitQuoteToCRM() {
    const wizardBody = document.getElementById('wizardBody');
    if (!wizardBody) return;

    wizardBody.innerHTML = `
      <div class="quote-success-box">
        <i class="fas fa-check-circle"></i>
        <h3>Your Cabinet Quote Request is Submitted!</h3>
        <p style="color:#6B7280; max-width:540px; margin:0 auto 1.5rem;">
          Thank you! Our senior kitchen designer has received your specs and layout file. 
          A custom 3D line estimate and layout drawing will be emailed within 24 hours.
        </p>
        <div style="background:var(--color-bg-main); border:1px solid var(--color-border); padding:1.25rem; border-radius:var(--radius-md); max-width:480px; margin:0 auto 2rem; text-align:left; font-size:0.875rem;">
          <p><strong>Ref Code:</strong> #TC-QUOTE-${Math.floor(100000 + Math.random() * 900000)}</p>
          <p><strong>Project:</strong> ${AppState.quoteData.projectType}</p>
          <p><strong>Cabinet Style:</strong> ${AppState.quoteData.style}</p>
          <p><strong>CRM Payload:</strong> <span style="color:#10B981; font-weight:700;">Received by Sales Endpoint</span></p>
        </div>
        <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
          <button class="btn-primary" onclick="window.print()"><i class="fas fa-file-pdf"></i> Download PDF Summary</button>
          <button class="btn-outline" id="returnHomeQuoteBtn"><i class="fas fa-home"></i> Return Home</button>
        </div>
      </div>
    `;

    document.getElementById('returnHomeQuoteBtn')?.addEventListener('click', () => switchTemplate('home'));
    showToast('Quote submission sent to CRM!');
  }

  // ==========================================
  // 8. TEMPLATE 5: CART LOGIC
  // ==========================================
  function updateCartCount() {
    const totalItems = AppState.cart.reduce((sum, item) => sum + item.qty, 0);
    cartBadgeCounts.forEach(badge => badge.textContent = totalItems);
  }

  function renderCartPage() {
    const cartTableBody = document.getElementById('cartTableBody');
    const cartSubtotalEl = document.getElementById('cartSubtotal');
    const cartTotalEl = document.getElementById('cartTotal');
    const shippingProgressFill = document.getElementById('shippingProgressFill');
    const shippingProgressText = document.getElementById('shippingProgressText');

    if (!cartTableBody) return;

    if (AppState.cart.length === 0) {
      cartTableBody.innerHTML = `
        <tr>
          <td colspan="4" style="text-align:center; padding:3rem;">
            <i class="fas fa-shopping-cart" style="font-size:3rem; color:var(--color-border); margin-bottom:1rem;"></i>
            <h3>Your Cart is Empty</h3>
            <p style="color:#6B7280; margin-bottom:1.5rem;">Explore our high-end cabinet collections and add items.</p>
            <button class="btn-primary" id="shopEmptyBtn">Browse Cabinet Shop</button>
          </td>
        </tr>
      `;
      document.getElementById('shopEmptyBtn')?.addEventListener('click', () => switchTemplate('category'));
      if (cartSubtotalEl) cartSubtotalEl.textContent = '$0.00';
      if (cartTotalEl) cartTotalEl.textContent = '$0.00';
      return;
    }

    let subtotal = 0;
    let html = '';

    AppState.cart.forEach((item, index) => {
      const itemSubtotal = item.price * item.qty;
      subtotal += itemSubtotal;

      html += `
        <tr>
          <td>
            <div class="cart-product-cell">
              <img src="${item.image}" alt="${item.name}" class="cart-item-img">
              <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>Finish: ${item.finish} | Size: ${item.size}</p>
                <p>Hinge: ${item.hinge}</p>
                <button class="remove-item-btn" data-index="${index}"><i class="fas fa-trash-alt"></i> Remove</button>
              </div>
            </div>
          </td>
          <td style="font-weight:700;">$${item.price.toFixed(2)}</td>
          <td>
            <div class="qty-control" style="width:100px;">
              <button class="qty-btn qty-minus" data-index="${index}">-</button>
              <input type="text" class="qty-input" value="${item.qty}" readonly>
              <button class="qty-btn qty-plus" data-index="${index}">+</button>
            </div>
          </td>
          <td style="font-weight:800; color:var(--color-primary); text-align:right;">$${itemSubtotal.toFixed(2)}</td>
        </tr>
      `;
    });

    cartTableBody.innerHTML = html;

    const remainingForFreeShip = Math.max(0, AppState.freeShippingThreshold - subtotal);
    const progressPct = Math.min(100, (subtotal / AppState.freeShippingThreshold) * 100);

    if (shippingProgressFill) shippingProgressFill.style.width = `${progressPct}%`;
    if (shippingProgressText) {
      if (remainingForFreeShip > 0) {
        shippingProgressText.innerHTML = `<span>Freight Shipping: You are <strong>$${remainingForFreeShip.toFixed(2)}</strong> away from FREE Shipping!</span> <span>${progressPct.toFixed(0)}%</span>`;
      } else {
        shippingProgressText.innerHTML = `<span style="color:#10B981;"><i class="fas fa-truck-fast"></i> Unlocked FREE Freight Shipping!</span> <span>100%</span>`;
      }
    }

    const grandTotal = Math.max(0, subtotal - AppState.discount);
    if (cartSubtotalEl) cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (cartTotalEl) cartTotalEl.textContent = `$${grandTotal.toFixed(2)}`;

    document.querySelectorAll('.qty-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = btn.dataset.index;
        if (AppState.cart[idx].qty > 1) {
          AppState.cart[idx].qty--;
        } else {
          AppState.cart.splice(idx, 1);
        }
        updateCartCount();
        renderCartPage();
      });
    });

    document.querySelectorAll('.qty-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = btn.dataset.index;
        AppState.cart[idx].qty++;
        updateCartCount();
        renderCartPage();
      });
    });

    document.querySelectorAll('.remove-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = btn.dataset.index;
        AppState.cart.splice(idx, 1);
        updateCartCount();
        renderCartPage();
        showToast('Item removed from cart', 'info');
      });
    });
  }

  // Coupon
  const applyCouponBtn = document.getElementById('applyCouponBtn');
  const couponInput = document.getElementById('couponInput');

  if (applyCouponBtn) {
    applyCouponBtn.addEventListener('click', () => {
      const code = couponInput?.value.trim().toUpperCase();
      if (code === 'SAVE10') {
        AppState.discount = 50.00;
        showToast('Coupon SAVE10 applied! $50.00 off.');
        renderCartPage();
      } else if (code === 'TEMIMA150') {
        AppState.discount = 150.00;
        showToast('VIP Coupon TEMIMA150 applied! $150.00 off.');
        renderCartPage();
      } else {
        showToast('Invalid code. Try "SAVE10" or "TEMIMA150"', 'error');
      }
    });
  }

  const proceedCheckoutBtn = document.getElementById('proceedCheckoutBtn');
  if (proceedCheckoutBtn) proceedCheckoutBtn.addEventListener('click', () => switchTemplate('checkout'));

  // ==========================================
  // 9. TEMPLATE 6: CHECKOUT LOGIC
  // ==========================================
  function renderCheckoutPage() {
    const checkoutSummaryItems = document.getElementById('checkoutSummaryItems');
    const checkoutSubtotal = document.getElementById('checkoutSubtotal');
    const checkoutGrandTotal = document.getElementById('checkoutGrandTotal');

    if (!checkoutSummaryItems) return;

    let subtotal = 0;
    let html = '';

    AppState.cart.forEach(item => {
      const itemSubtotal = item.price * item.qty;
      subtotal += itemSubtotal;
      html += `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.85rem; font-size:0.875rem;">
          <div style="display:flex; gap:0.6rem; align-items:center;">
            <img src="${item.image}" style="width:40px; height:40px; border-radius:4px; object-fit:cover;">
            <div>
              <strong>${item.name}</strong>
              <div style="color:#6B7280; font-size:0.75rem;">Qty: ${item.qty}</div>
            </div>
          </div>
          <span style="font-weight:700;">$${itemSubtotal.toFixed(2)}</span>
        </div>
      `;
    });

    checkoutSummaryItems.innerHTML = html;
    const finalTotal = Math.max(0, subtotal - AppState.discount);
    if (checkoutSubtotal) checkoutSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (checkoutGrandTotal) checkoutGrandTotal.textContent = `$${finalTotal.toFixed(2)}`;
  }

  const paymentCards = document.querySelectorAll('.payment-opt-card');
  paymentCards.forEach(card => {
    card.addEventListener('click', () => {
      paymentCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
    });
  });

  const placeOrderBtn = document.getElementById('placeOrderBtn');
  const orderSuccessModal = document.getElementById('orderSuccessModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('checkoutEmail');
      if (emailInput && !emailInput.value) {
        showToast('Please enter your email for order receipt.', 'error');
        emailInput.focus();
        return;
      }

      if (orderSuccessModal) {
        const orderNum = Math.floor(100000 + Math.random() * 900000);
        document.getElementById('modalOrderNum').textContent = `#TC-${orderNum}`;
        orderSuccessModal.classList.add('active');
        AppState.cart = [];
        updateCartCount();
      }
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      if (orderSuccessModal) orderSuccessModal.classList.remove('active');
      switchTemplate('home');
    });
  }

  updateCartCount();
});
