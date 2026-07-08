package com.servicenow.backend.repository;

import com.servicenow.backend.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByCustomerUsername(String customerUsername);

    List<Booking> findByProviderUsername(String providerUsername);
}