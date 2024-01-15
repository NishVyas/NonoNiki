package com.nononiki.ecommerce.service;

import com.nononiki.ecommerce.dao.CustomerRepository;
import com.nononiki.ecommerce.dto.Purchase;
import com.nononiki.ecommerce.dto.PurchaseResponse;
import com.nononiki.ecommerce.entity.Customer;
import com.nononiki.ecommerce.entity.Order;
import com.nononiki.ecommerce.entity.OrderItem;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private CustomerRepository customerRepository;

    public CheckoutServiceImpl(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        // Retire the Order info from the DTO
        Order order = purchase.getOrder();

        // Generate the tracking number
        String orderTrackingNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackingNumber);

        // Populate Order with OrderItems
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(order::add);

        // Populate Order with billing and shipping address
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        // Populate Customer with Order
        Customer customer = purchase.getCustomer();
        customer.add(order);

        // Save to Database
        customerRepository.save(customer);

        // Return a response
        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {
        // Generate a random UUID
        return UUID.randomUUID().toString();
    }
}
