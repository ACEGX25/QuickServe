package com.quickserve.app.service;

import com.quickserve.app.model.ServiceListing;

import java.util.List;

public interface ImageResolverService {

    List<String> resolve(ServiceListing listing);
}
