import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { RightOutlined } from "@ant-design/icons";
import {
  useFeatureProductQuery,
  useGetProductTypeQuery,
  useGetSubCategoryListQuery,
  useNobelsetCategoryListMutation,
  usePriceFilterMutation,
  useSubCatListMutation,
} from "@/redux/features/productApi";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import MenusProductSlider from "./menus-product-slider";
import { HomeTwoPopularPrdLoader } from "@/components/loader";
import CommonImage from "../../../../public/assets/img/earring-menu-pic-1.png";
import Loader from "../../../components/loader/loader";
import { useDispatch } from "react-redux";
import { filterData } from "@/redux/features/shop-filter-slice";
import { useSetState } from "@/utils/functions";
import MenusProductSlider1 from "./menus-product-slider1";

const slider_setting = {
  slidesPerView: 4,
  spaceBetween: 10,
  pagination: {
    el: ".tp-category-slider-dot-4",
    clickable: true,
  },
  breakpoints: {
    1400: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 2,
    },
    576: {
      slidesPerView: 2,
    },
    0: {
      slidesPerView: 1,
    },
  },
};

const CategoryContent = ({
  title,
  commonImage,
  children,
  lists,
  categoryName,
  subCategoryLoading,
  SubCatProduct,
}) => {
  const router = useRouter();

  return (
    <div className="row" style={{ paddingBottom: "30px",height:"100%" }}>
      <div className="col-3" style={{ paddingLeft: "30px", height:"100%" , overflowY:"scroll", scrollbarWidth:"thin"}}>
        {title &&
          <div style={{ paddingLeft: "25px" }}>
            <h6 style={{ paddingBottom: "15px", fontWeight: "500" }}>{title}</h6>
          </div>
        }

        {subCategoryLoading ? (
          <SingleLoader loading={subCategoryLoading} />
        ) : (
          <div>
            <ul style={{ margin: "0px 25px 10px " , height:"100%"}}>
              {lists?.slice(0, 12)?.map((item) => {
                return (
                  <li className="sub-sub-menu"
                    style={{
                      cursor: "pointer",
                      // borderBottom: "1px solid #e8e3e3",
                      // marginBottom: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "10px",
                      fontSize: "18px",
                      borderRadius: "10px"
                    }}
                    onMouseEnter={() => SubCatProduct(item)}
                    key={item?.node?.slug}
                    onClick={() => {
                      router?.push({
                        pathname: "/shop",
                        query: { category: item?.node?.slug },
                      });
                    }}
                  >
                    <a
                      href={`/shop?category=${item?.node?.slug}`}
                      className="cursor-pointer"
                      style={{
                        fontWeight: "500",
                        marginBottom: "0px",
                        color: "black",
                        cursor: "pointer",
                        fontSize: "18px",
                        textTransform: "capitalize"
                      }}
                      onClick={() => {
                        router.push({
                          pathname: "/shop",
                          query: { category: item?.node?.slug },
                        });
                      }}
                    >
                      {item?.node?.name.toLowerCase()}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {lists?.length > 3 ? (
          <></>
        ) : (
          <></>
          // <div>
          //   <div>
          //     {commonImage ? (
          //       <img
          //         src={commonImage}
          //         // src="assets/img/blog.webp"
          //         alt="category image"
          //         style={{
          //           width: "100%",
          //           height: "250px",
          //           objectFit: "cover",
          //           objectPosition: "center",
          //           borderRadius: "10px",
          //         }}
          //       />
          //     ) : (
          //       <img
          //         src={"/assets/img/earring-menu-pic-1.png"}
          //         alt="category image"
          //         style={{ width: "100%", height: "250px" }}
          //       />
          //     )}
          //   </div>
          //   <div style={{ textAlign: "center", padding: "20px 0px" }}>
          //     <h5 style={{ fontWeight: "400", fontSize: "20px" }}>
          //       Excepteur sint occaecat
          //       <br /> cupidatat
          //     </h5>
          //     <button
          //       className="tp-btn tp-btn-border"
          //       onClick={() => {
          //         router?.push({
          //           pathname: "/shop",
          //           // query: { category: parentCategoryId }, // Your parameters
          //         });
          //       }}
          //       style={{ padding: "5px 18px" }}
          //     >
          //       Shop Now
          //     </button>
          //   </div>
          // </div>
        )}
      </div>
      <div className="col-9">
        <div className="row" style={{ padding: "20px" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

const CategoryComponent = (props) => {
  const {
    productList,
    lastHoveredCategory,
    productLoading,
    commonImage,
    subCategoryList,
    subCategoryLoading,
    SubCatProduct,
  } = props;

  const renderContent = () => {
    return productLoading ? (
      <SingleLoader loading={productLoading} />
    ) : productList?.length > 0 ? (
      // <Swiper
      //   {...slider_setting}
      //   modules={[Pagination]}
      //   className="tp-category-slider-active-4 swiper-container"
      // >
      //   {productList?.map((item) => (
      //     <SwiperSlide key={item?.node?.id}>
      //       <div
      //         className="col-lg-3 menus-product-list"
      //         style={{ padding: "0px 8px 0px 0px", width: "250px" }}
      //       >
      //         <MenusProductSlider product={item} />
      //       </div>
      //     </SwiperSlide>
      //   ))}
      // </Swiper>
       <Swiper
                    slidesPerView={productList?.length > 0 ? 3 : 4}
                    spaceBetween={10}
                    pagination={{
                      el: ".tp-category-slider-dot-4",
                      clickable: true,
                    }}
                    breakpoints={{
                      1400: { slidesPerView: 3 },
                      1200: { slidesPerView: 3 },
                      992: { slidesPerView: 3 },
                      768: { slidesPerView: 2 },
                      576: { slidesPerView: 2 },
                      0: { slidesPerView: 1 },
                    }}
                    modules={[Pagination]}
                    className="tp-category-slider-active-4 swiper-container"
                  >
                    {productList?.map((item) => (
                      <SwiperSlide key={item?.node?.id}>
                        <div
                          className={`${productList?.length > 0 ? "col-lg-4" : "col-lg-3"
                            } menus-product-list`}
                          style={{ padding: "0px 8px 0px 0px", width: "250px" }}
                        >
                          {/* <MenusProductSlider product={item} /> */}
                          <MenusProductSlider1 product={item} />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
    ) : (
      <div
        style={{
          fontSize: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height:"100%"
        }}
      >
        Product Not Found
      </div>
    );
  };

  const renderCategoryContent = () => {
    return (
      <CategoryContent
        // title={title}
        commonImage={commonImage}
        lists={subCategoryList}
        categoryName={lastHoveredCategory}
        subCategoryLoading={subCategoryLoading}
        SubCatProduct={SubCatProduct}
      >
        {renderContent()}
      </CategoryContent>
    );
  };

  return <div>{renderCategoryContent()}</div>;
};

function SingleLoader({ loading }) {
  return (
    <div
      className="col-xl-3 col-lg-3 col-sm-6 d-flex align-items-center"
      style={{ height: "300px" }}
    >
      <Loader loading={loading} />
    </div>
  );
}

const Menus1 = () => {
  const router = useRouter();

  const [state, setState] = useSetState({
    categoryList: [],
    productList: [],
    subCategoryList: [],
  });

  const [categoryLists, { loading: loading }] =
    useNobelsetCategoryListMutation();

  const [priceFilter, { isLoading: productLoading }] = usePriceFilterMutation();

  const [subCatList, { isLoading: subCatLoading }] = useSubCatListMutation();

  const dispatch = useDispatch();
  const [lastHoveredCategory, setLastHoveredCategory] = useState("necklaces");

  useEffect(() => {
    dispatch(filterData({}));
  }, [router]);

  useEffect(() => {
    categoryList();
  }, []);

  const categoryList = async () => {
    try {
      const res = await categoryLists();
      const category = res?.data?.data?.categories?.edges;
      if (category?.length > 0) {
        const categoryList = res?.data?.data?.categories?.edges?.map(
          (item) => ({
            name: item?.node?.name,
            id: item?.node?.id,
            slug: item?.node?.slug,
          })
        );
        setState({ categoryList });
      }
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  const hoverCategoryProduct = async (slug) => {
    setLastHoveredCategory(slug);

    const subcategory = await subCatList({
      slug: slug,
    });

    const res = await priceFilter({
      filter: { categorySlugs: slug },
      sortBy: { direction: "DESC", field: "CREATED_AT" },
      first: 12,
      after: null,
    });
    if (subcategory?.data?.data?.category?.children?.edges?.length > 0) {
      setState({
        subCategoryList: subcategory?.data?.data?.category?.children?.edges,
      });
    } else {
      setState({ subCategoryList: [] });
    }
    const list = res?.data?.data?.productsSearch?.edges?.slice(0, 11);
    setState({ productList: list });
  };

  const SubCatProduct = async (item) => {

    const res = await priceFilter({
      filter: { categorySlugs: item?.slug },
      sortBy: { direction: "DESC", field: "CREATED_AT" },
      first: 12,
      after: null,
    });
    const list = res?.data?.data?.productsSearch?.edges?.slice(0, 11);
    setState({ productList: list });
  };

  return (
    <ul style={{ display: "flex" }}>
      <li>
        <Link href="/shop" style={{ fontWeight: "500", color: "black" }}>
          All Jewellery
        </Link>
      </li>
      <li className="has-dropdown has-mega-menu">
        <Link
          href="/shop"
          style={{ fontWeight: "500", color: "black" }}
          onMouseEnter={() => hoverCategoryProduct("necklaces")}
        >
          Collections
        </Link>
        <div className="home-menu tp-submenu tp-mega-menu">
          <div className="row" style={{height:"100%"}}>
            <div
              className="col-lg-2"
              style={{
                backgroundColor: "#fff",
                padding: "0px",
                color: "black",
                // overflowY:"scroll",
                height:"100%"
              }}
            >
              <ul className="cat-main-dd" style={{height:"100%"}}>
                {state.categoryList?.map((item) => {
                  return (
                    <li
                      className={`shop-submenu-catageroy-list ${lastHoveredCategory == item?.slug ? "active" : ""
                        }`}
                      onMouseEnter={() => hoverCategoryProduct(item?.slug)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingRight: "10px",
                        borderRadius: "10px",
                      }}
                      onClick={() => {
                        router.push({
                          pathname: "/shop",
                          query: {
                            category: item?.slug
                              .toLowerCase()
                              .replace("&", "")
                              .split(" ")
                              .join("-"),
                          },
                        });
                      }}
                    >
                      <a
                        href={`/shop?category=${item?.slug
                          .toLowerCase()
                          .replace("&", "")
                          .split(" ")
                          .join("-")}`}
                        style={{
                          cursor: "pointer",
                          marginBottom: "0px",
                          textTransform: "capitalize",
                        }}
                        className={`shop-submenu-catageroy-list-a cursor-pointer ${lastHoveredCategory == item?.slug ? "active" : ""
                          }`}
                        onClick={() => {
                          router.push({
                            pathname: "/shop",
                            query: {
                              category: item?.slug
                                .toLowerCase()
                                .replace("&", "")
                                .split(" ")
                                .join("-"),
                            },
                          });
                        }}
                      >
                        {item?.name?.toLowerCase()}
                      </a>

                      <RightOutlined
                        style={{ cursor: "pointer", marginBottom: "0px" }}
                        className={`shop-submenu-catageroy-list-a ${lastHoveredCategory == item?.slug ? "active" : ""
                          }`}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="col-lg-10">
              <div className="tp-mega-menu-item h-100">
                {state.subCategoryList?.length > 0 ? (
                  <CategoryComponent
                    commonImage="/assets/img/earring-menu-pic-1.png"
                    lastHoveredCategory={lastHoveredCategory}
                    productList={state.productList}
                    productLoading={productLoading}
                    subCategoryList={state.subCategoryList}
                    subCategoryLoading={subCatLoading}
                    SubCatProduct={SubCatProduct}
                    style={{height:"100%"}}
                  />
                ) : productLoading ? (
                  <SingleLoader loading={productLoading} />
                ) : state.productList?.length > 0 ? (
                  
                  <Swiper
                    slidesPerView= {4}
                    spaceBetween={10}
                    pagination={{
                      el: ".tp-category-slider-dot-4",
                      clickable: true,
                    }}
                    breakpoints={{
                      1400: { slidesPerView: 4 },
                      1200: { slidesPerView: 4 },
                      992: { slidesPerView: 3 },
                      768: { slidesPerView: 2 },
                      576: { slidesPerView: 2 },
                      0: { slidesPerView: 1 },
                    }}
                    modules={[Pagination]}
                    className="tp-category-slider-active-4 swiper-container"
                  >
                    {state.productList?.map((item) => (
                      <SwiperSlide key={item?.node?.id}>
                        <div
                          className={`${state.subCategoryList?.length > 0 ? "col-lg-4" : "col-lg-3"
                            } menus-product-list`}
                          style={{ padding: "0px 8px 0px 0px", width: "250px" }}
                        >
                          {/* <MenusProductSlider product={item} /> */}
                          <MenusProductSlider1 product={item} />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <div
                    style={{
                      fontSize: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Product Not Found
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </li>

      <li>
        <Link
          href={{
            pathname: "/shop",
            query: { category: "silver" },
          }}
          style={{ fontWeight: "500", color: "black" }}
        >
          Silver
        </Link>
      </li>
      {/* {state.token && ( */}
      <li>
        <Link href="/gift-card" style={{ fontWeight: "500", color: "black" }}>
          Gift Card
        </Link>
      </li>
      {/* )} */}
    </ul>
  );
};

export default Menus1;
