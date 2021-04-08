import { useState } from "react";
import { Page, Card, EmptyState, List } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const emptyState = (
    <>
      <EmptyState
        heading="Discount your products in a box"
        action={{
          content: "Select Products",
          onAction: () => {
            console.log("clicked");
            setOpen(true);
          },
        }}
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      />
      <ResourcePicker
        resourceType="Product"
        open={open}
        onSelection={(selectPayload) => {
          const selectedIds = selectPayload.selection.map((product) => {
            return product.id;
          });
          setOpen(false);
          setSelectedProducts(selectedIds);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );

  const productList = (
    <List>
      {selectedProducts.map((productId) => (
        <List.Item key={productId}>{productId}</List.Item>
      ))}
    </List>
  );

  return (
    <Page>
      <Card>{selectedProducts.length === 0 ? emptyState : productList}</Card>
    </Page>
  );
};

export default Index;
