package com.nononiki.ecommerce.dto;

import com.nononiki.ecommerce.entity.Address;
import com.nononiki.ecommerce.entity.Customer;
import com.nononiki.ecommerce.entity.Order;
import com.nononiki.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}
