import SEO from "@/components/seo";

import Wrapper from "@/layout/wrapper";
import React, { useEffect } from "react";

import HeaderSection from "@/components/home/headerSection";
import HomeFooter from "@/components/home/HomeFooter";
import BrandBanner from "@/components/banner/brand-banner";
import { useRouter } from "next/router";
import {
  useBrandDataMutation,
  useNewProductListMutation,
  useShopPaginationMutation,
} from "@/redux/features/productApi";
import { CommonLoader, useSetState } from "@/utils/functions";
import Pagination from "@/pagination/pagination";
import ProductItem1 from "@/components/products/fashion/product-item-1";
import SimilarProductItem from "@/components/products/beauty/similar-product-item-1";
import ProductItem from "@/components/products/beauty/product-item";

const Page = () => {
  const router = useRouter();

  const { slug } = router.query;

  const [state, setState] = useSetState({
    number: 1,
    pageCount: 10,
    productList: [],
    startCursor: null,
    endCursor: null,
    isNext: false,
    isPrev: false,
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    prevPage: 1,
    brandData: null,
  });

  const [shopPagination, { isLoading: shopPaginationLoading }] =
    useShopPaginationMutation();

  const [brandData, { isLoading: brandLoading }] = useBrandDataMutation();

  const [newProductList, { isLoading: productPagiLoading }] =
    useNewProductListMutation();

  useEffect(() => {
    getProductList();
    brandDetails();
  }, [slug]);

  const brandDetails = async () => {
    try {
      const res = await brandData({
        slug,
      });
      setState({ brandData: res?.data?.data?.brand });
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const getProductList = async () => {
    try {
      const res = await shopPagination({
        before: null,
        first: state.pageCount,
        after: null,
        sortBy: { direction: "DESC", field: "CREATED_AT" },
        page: state.number,
        filter: {
          brand: slug,
        },
      });
      const data = res?.data?.data?.findProductsEndcursor;

      dynamicPageData(data?.pageInfo?.endCursor);
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const dynamicPageData = async (endCursor) => {
    const res = await newProductList({
      first: state.pageCount,
      after: state.endCursor,
      sortBy: { direction: "DESC", field: "CREATED_AT" },
      filter: {
        brand: slug,
      },
    });

    setCursorAndList(res);
  };

  const setCursorAndList = (res) => {
    const data = res?.data?.data?.productsSearch;
    const list = data?.edges;
    setState({
      productList: list,
      startCursor: data?.pageInfo?.startCursor,
      endCursor: data?.pageInfo?.endCursor,
      isNext: data?.pageInfo?.hasNextPage,
      isPrev: data?.pageInfo?.hasPreviousPage,
      totalCount: data?.totalCount,
      totalPages: Math.ceil(data?.totalCount / 10),
    });
    window.scrollTo({
      top: 600,
      behavior: "smooth",
    });
  };

  const handlePageChange = (number) => {
    if (state.prevPage === null) {
      setState({ prevPage: state.currentPage });
    } else {
      if (number === state.prevPage + 1) {
        finalNextData();
      } else if (number === state.prevPage - 1) {
        finalPrevData();
      } else {
        if (number == 1) {
          finalInitialData();
        } else {
          finalDynamicPaginationData(number);
        }
      }
    }

    setState({ prevPage: number, currentPage: number });
  };

  const finalNextData = async () => {
    const res = await newProductList({
      first: state.pageCount,
      after: state.endCursor,
      sortBy: { direction: "DESC", field: "CREATED_AT" },
      filter: {
        brand: slug,
      },
    });
    setCursorAndList(res);
  };

  const finalPrevData = async () => {
    const res = await newProductList({
      last: state.pageCount,
      before: state.startCursor,
      sortBy: { direction: "DESC", field: "CREATED_AT" },
      filter: {
        brand: slug,
      },
    });
    setCursorAndList(res);
  };

  const finalInitialData = async () => {
    let body = {
      first: state.pageCount,
      after: null,
      sortBy: { direction: "DESC", field: "CREATED_AT" },
      filter: {
        brand: slug,
      },
    };
    const res = await newProductList(body);
    setCursorAndList(res);
  };

  const finalDynamicPaginationData = async (number) => {
    const res = await shopPagination({
      before: null,
      first: state.pageCount,
      after: null,
      sortBy: { direction: "DESC", field: "CREATED_AT" },
      page: number,
      filter: {
        brand: slug,
      },
    });

    const data = res?.data?.data?.findProductsEndcursor;

    dynamicPageData(data?.pageInfo?.endCursor);
  };

  console.log("productList", state.productList);
  

  return (
    <Wrapper>
      <SEO pageTitle="Cart" />
      {/* <HeaderTwo style_2={true} /> */}
      <HeaderSection />
      <div className="common-bg">
        <div className="section-wd">
          <BrandBanner logo={state.brandData?.logo}/>
        </div>

        <div className="container py-5 ">
          <div className="row">
            <div className="col-12 col-lg-7">
              <div className="d-flex text-center flex-column align-items-center justify-content-center h-100">
                <h2 className="main-ti" style={{textTransform:"capitalize"}}>{state.brandData?.name.toLowerCase()}</h2>
                <p className="text-black">
                {state.brandData?.description}
                 
                </p>
              </div>
            </div>
            <div className="col-10 col-lg-5 m-auto d-flex justify-content-center">
              <img
                src="https://sreethangamjewellery.com/stjt/wp-content/uploads/2022/07/Section-Image-sameli-374x300.png"
                alt=""
              />
            </div>
          </div>
          {shopPaginationLoading || productPagiLoading ? (
            <CommonLoader
              loading={shopPaginationLoading || productPagiLoading}
            />
          ) : state.productList?.length > 0 ? (
            <div className="tp-shop-items-wrapper tp-shop-item-primary my-5">
              <div className="tab-content" id="productTabContent">
                <div
                  className="tab-pane fade show active"
                  id="grid-tab-pane"
                  role="tabpanel"
                  aria-labelledby="grid-tab"
                  tabIndex="0"
                >
                  {/* <div className="row gx-1 gx-lg-3">
                {products?.map((item) => (
                  <div
                    key={item._id}
                    className="col-xl-4 col-md-6 col-sm-6 col-6 mb-20 mb-lg-50"
                  >
                    <ProductItem products={item} updateData={updateData} />
                  </div>
                ))}
              </div> */}
                  <div className=" position-relative ShopByCollections row  d-flex flex-wrap align-items-stretch">
                    {/* <div
                    className="swiper-wrapper "
                   
                  > */}
                    {state.productList?.map((item, index) => (
                      // <ProductItem1
                      //   products={item}
                      //   // updateData={updateData}
                      //   index={index}
                      // />
                      <div
                    key={item._id}
                    className="col-xl-3 col-md-6 col-sm-6 col-6 mb-20 mb-lg-50"
                  >
                      <ProductItem
                                  product={item?.node}
                                  primary_style={true}
                                  index={index}
                                />
                                </div>
                    ))}
                    {/* </div> */}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center mt-50 mb-50 mt-lg-40 mb-lg-40">
              <img src="assets/img/product/cartmini/empty-cart.png" />{" "}
              <p
                className="mt-20"
                style={{ fontSize: "20px", color: "rgb(194, 136, 43)" }}
              >
                No Product Found
              </p>
            </div>
          )}
          {state.productList?.length > 0 && (
            <div
              className="mb-0 "
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pagination
                activeNumber={handlePageChange}
                totalPages={state.totalPages}
                currentPages={state.currentPage}
              />
            </div>
          )}
        </div>
      </div>

      <HomeFooter />
    </Wrapper>
  );
};
export default Page;
