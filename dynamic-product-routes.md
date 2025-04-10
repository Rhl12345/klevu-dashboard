# Product Routes Structure

This document outlines the dynamic and static routes used in the project for managing product-related functionalities.

## Product Routes Diagram

![Product Routes Diagram](https://storagemedia.corporategear.com/betastoragemedia/1/brand/color_80.png)

## Legend

- **Static Route**: Regular routes that do not change.
- **Dynamic Route**: Routes that include variables or parameters.
- **Use as Slug**: Dynamic segments used as slugs in the URL.

## Routes Overview

### Admin Section

- **/admin**: Base route for admin functionalities.

#### Master Catalog

- **/master-catalog**: Access the master catalog.
  - **/[productsDatabase]**: Dynamic route for different product databases.
    - **/create**: Create a new product entry.
    - **/edit**: Edit an existing product entry.
      - **/[productId]**: Specific product ID for editing.

#### Store Management

- **/store**: Base route for store management.
  - **/[storeType]**: Dynamic route for different store types.
    - **/[storeName]**: Specific store name.
      - **/products**: View products in the store.
        - **/edit**: Edit a specific product.
          - **/[productId]**: Specific product ID for editing.

### Product Feed

- **/product-feed** or **/core-product-feed**: View the product feed.

## Usage Examples

- **Admin Master Catalog**:

  - To create a new product: `/admin/master-catalog/[productsDatabase]/create`
  - To edit a product: `/admin/master-catalog/[productsDatabase]/edit/[productId]`

- **Store Management**:
  - To view products in a store: `/store/[storeType]/[storeName]/products`
  - To edit a product in a store: `/store/[storeType]/[storeName]/products/edit/[productId]`

## Notes

- Ensure that dynamic segments like `[productsDatabase]`, `[productId]`, `[storeType]`, `[storeName]` are replaced with actual values when constructing URLs.
- The routes are designed to be flexible and accommodate various product and store configurations.

## Future Enhancements

- Consider adding more detailed documentation for each route, including expected parameters and response formats.
- Explore the possibility of integrating route guards for enhanced security.
