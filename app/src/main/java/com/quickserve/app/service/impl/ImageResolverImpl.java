package com.quickserve.app.service.impl;

import com.quickserve.app.model.Category;
import com.quickserve.app.model.ListingImage;
import com.quickserve.app.model.ServiceListing;
import com.quickserve.app.service.ImageResolverService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ImageResolverImpl implements ImageResolverService {
    private static final Map<Category, String> DEFAULT_IMAGES = Map.of(
            Category.PLUMBING, "https://res.cloudinary.com/dqyl2aset/image/upload/v1768925137/plumbing_def_bh0kuf.jpg",
            Category.REPAIRS, "https://res.cloudinary.com/dqyl2aset/image/upload/v1768925137/repairs_def_xqaiuj.jpg",
            Category.CLEANING, "https://res.cloudinary.com/dqyl2aset/image/upload/v1768925136/default_clean_owblhm.jpg",
            Category.MOVERS, "https://res.cloudinary.com/dqyl2aset/image/upload/v1768925136/movers_def_arpdvt.jpg",
            Category.ELECTRICAL, "https://res.cloudinary.com/dqyl2aset/image/upload/v1768925136/elec_def_jmtkqz.jpg",
            Category.BEAUTY, "https://res.cloudinary.com/dqyl2aset/image/upload/v1768925136/beu_def_uzo3ui.jpg",
            Category.AC_SERVICE, "https://res.cloudinary.com/dqyl2aset/image/upload/v1768925136/ac_def_n1spqv.jpg"
    );

    @Override
    public List<String> resolve(ServiceListing listing) {

        if (listing.getImages() != null && !listing.getImages().isEmpty()) {
            return listing.getImages()
                    .stream()
                    .map(ListingImage::getImageUrl)
                    .toList();
        }

        Category category = listing.getCategory();

        String fallback = DEFAULT_IMAGES.getOrDefault(
                category != null ? category : Category.PLUMBING,
                DEFAULT_IMAGES.get(Category.PLUMBING)
        );

        return List.of(fallback);
    }

}
