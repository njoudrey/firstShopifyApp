import gql from "graphql-tag";
import { Query } from "react-apollo";
import store from 'store-js';
import { 
    Card,
    DisplayText,
    Stack,
    TextStyle,
    Thumbnail,
    ResourceList,
    ResourceItem
} from '@shopify/polaris'

const GET_PRODUCTS_BY_ID = gql`
    query getProducts($ids: [ID!]!) {
        nodes(ids: $ids) {
            ... on Product {
                title
                handle
                descriptionHtml
                id
                images(first: 1) {
                    edges {
                        node {
                            originalSrc
                            altText
                        }
                    }
                }
                variants(first: 1) {
                    edges {
                        node {
                            price
                            id
                        }
                    }
                }
            }
        }
    }
`;

class ResourceListWithProducts extends React.Component {
    render() {
        return (
            <Query query={GET_PRODUCTS_BY_ID} variables={{ ids: store.get('ids') }}>
                {({ data, loading, error }) => {
                    if (loading) return <div>loading...</div>;
                    if (error) return <div>Error! {error.message}</div>;
                    console.log(data);
                    return (
                        <Card>
                            <ResourceList
                                showHeader
                                resourceName = {{plural: "Products", singular: "Product"}}
                                items = {data.nodes}
                                renderItem = {(item) => {
                                    const media = (
                                        <Thumbnail
                                            source = {
                                                item.images.edges[0] ? item.images.edges[0].node.originalSrc : ''
                                            }
                                            alt = {
                                                item.images.edges[0] ? item.images.edges[0].node.altText : ''
                                            }
                                        />
                                    );
                                    const price = item.variants.edges[0].node.price;
                                    return (
                                        <ResourceItem
                                            id={item.id}
                                            media={media}
                                            accessibilityLabel={'View details for ${item.title}'}
                                        >
                                            <Stack>
                                                <Stack.Item fill>
                                                    <h2>
                                                        <TextStyle variation = "strong">
                                                            <DisplayText size="small">
                                                                {item.title}
                                                            </DisplayText>
                                                        </TextStyle>
                                                    </h2>
                                                </Stack.Item>
                                                <Stack.Item fill>
                                                    <DisplayText size="small">
                                                        ${price}
                                                    </DisplayText>
                                                </Stack.Item>
                                            </Stack>
                                        </ResourceItem>
                                    );
                                }}
                            />
                        </Card>
                    );
                }}
            </Query>
        );
    }
}

export default ResourceListWithProducts;