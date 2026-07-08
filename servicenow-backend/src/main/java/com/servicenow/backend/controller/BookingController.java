package com.servicenow.backend.controller;

import com.servicenow.backend.entity.Booking;
import com.servicenow.backend.exception.ApiException;
import com.servicenow.backend.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    // CREATE BOOKING
    @PostMapping("/bookings")
    public Booking createBooking(@RequestBody Booking booking) {
        booking.setStatus("Pending");
        return bookingRepository.save(booking);
    }

    // CUSTOMER BOOKINGS
    @GetMapping("/bookings/customer/{username}")
    public List<Booking> getCustomerBookings(@PathVariable String username) {
        return bookingRepository.findByCustomerUsername(username);
    }

    // PROVIDER BOOKINGS
    @GetMapping("/bookings/provider/{username}")
    public List<Booking> getProviderBookings(@PathVariable String username) {
        return bookingRepository.findByProviderUsername(username);
    }

    // UPDATE BOOKING STATUS
    @PutMapping("/bookings/{id}/status")
    public Booking updateBookingStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        Booking booking = bookingRepository.findById(id).orElse(null);

        if (booking == null) {
            throw new ApiException("Booking not found");
        }

        booking.setStatus(status);
        return bookingRepository.save(booking);
    }
}