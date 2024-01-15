package com.nononiki.ecommerce.service;

import com.nononiki.ecommerce.dto.Purchase;
import com.nononiki.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
