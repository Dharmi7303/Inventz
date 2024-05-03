package com.inventorysystem.Backend.controller;

import com.inventorysystem.Backend.dto.customer.CustomerDTO;
import com.inventorysystem.Backend.dto.provider.ProviderCreationDTO;
import com.inventorysystem.Backend.dto.provider.ProviderDTO;
import com.inventorysystem.Backend.dto.provider.ProviderUpdateDTO;
import com.inventorysystem.Backend.dto.provider.ProvidersPageDTO;
import com.inventorysystem.Backend.service.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/provider")
@CrossOrigin
public class ProviderController {

    @Autowired
    ProviderService providerService;

    @PostMapping
    ResponseEntity<ProviderDTO> createProvider(@RequestBody ProviderCreationDTO provider) {
        ProviderDTO createdProvider = providerService.createProvider(provider);
        return ResponseEntity.status(HttpStatus.OK).body(createdProvider);
    }

    @GetMapping
    ResponseEntity<ProvidersPageDTO> getAllProviders(
            @RequestParam(name = "searchCriteria", required = false) String criteria,
            @RequestParam(name = "page") Integer page,
            @RequestParam(name = "pageSize") Integer pageSize
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(providerService.getAllProviders(criteria, page, pageSize));
    }

    @GetMapping("/{id}")
    ResponseEntity<ProviderDTO> getProviderById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(providerService.getProviderById(id));
    }

//    @GetMapping("/document/{document}")
//    ResponseEntity<CustomerDTO> getProviderByDocument(@PathVariable String document) {
//        CustomerDTO foundprovider = providerService.getProviderByDocument(document);
//        if (foundProvider == null) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//        }
//        return ResponseEntity.status(HttpStatus.OK).body(foundProvider);
//    }

    @PutMapping("/{id}")
    ResponseEntity<ProviderDTO> updateProvider(@PathVariable Long id, @RequestBody ProviderUpdateDTO providerData) {
        ProviderDTO updatedProvider = providerService.updateProvider(id, providerData);
        return ResponseEntity.status(HttpStatus.OK).body(updatedProvider);
    }
}
