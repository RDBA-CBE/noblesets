import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import DetailsThumbWrapper from "./details-thumb-wrapper";
import DetailsWrapper from "./details-wrapper";
import { useDispatch } from "react-redux";
import DetailsTabNav from "./details-tab-nav";
import RelatedProducts from "./related-products";
import { useRouter } from "next/router";
import ProductItem from "../products/beauty/product-item";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Navigation, Autoplay } from "swiper";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { slider_setting } from "../../utils/functions";
import {
  useGetRelatedProductsQuery,
  useProductReviewMutation,
} from "@/redux/features/productApi";
import ReviewSection from "./ReviewSection";
import DetailsThumbWrapper1 from "./details-thumb-wrapper1";
import DetailsWrapper1 from "./details-wrapper-1";
const ProductDetailsArea = ({
  productItem,
  pageTitle,
  detailsRefetch,
  youMayLikeData,
  isGiftCard,
  parentSlug,
}) => {
  const router = useRouter();
  const { media, imageURLs, videoId, status } = productItem || {};
  const [activeImg, setActiveImg] = useState(null);
  const [reviewList, setReview] = useState([]);

  const dispatch = useDispatch();

  const [review] = useProductReviewMutation();

  const id = productItem?.category[0]?.id;
  const {
    data: related_product,
    isError,
    isLoading,
  } = useGetRelatedProductsQuery({ id });

  const productsList = related_product?.data?.category?.products?.edges;

  const sameProduct = productsList?.filter((item) => {
    return item?.node?.id !== productItem?.id;
  });

  const removeHiddenCategory = sameProduct?.filter((item) => {
    return item?.node?.category.some((cat) => cat?.name === "Hidden");
  });

  const idsToRemove = removeHiddenCategory?.map((item) => item.node.id);

  const relatedproducts = sameProduct?.filter(
    (item) => !idsToRemove.includes(item.node.id)
  );

  // active image change when img change
  useEffect(() => {
    setActiveImg(media);
  }, [media]);

  // handle image active
  const handleImageActive = (item) => {
    setActiveImg(item);
  };

  useEffect(() => {
    getReviews();
  }, []);

  // Ref to the related products section
  const relatedProductsRef = useRef(null);

  const relatedClicked = () => {
    // Scroll to the related products section
    relatedProductsRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const thumbRef = useRef(null);

  useEffect(() => {
    const el = thumbRef.current;
    const initialOffsetTop = el?.offsetTop ?? 0;

    function handleScroll() {
      const scrollY = window.scrollY || window.pageYOffset;
      const stickyTop = 120;

      if (scrollY + stickyTop > initialOffsetTop) {
        el.style.position = "sticky";
        el.style.top = `${stickyTop}px`;

        el.style.zIndex = 10;
      } else {
        el.style.position = "static";
        el.style.top = "auto";
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getReviews = async () => {
    try {
      const res = await review({
        productId: [productItem?.id],
      });
      const reviewss =
        res?.data?.data?.productReviews?.edges?.length > 0
          ? res?.data?.data?.productReviews?.edges?.map((item) => item?.node)
          : [];
      setReview(reviewss);
    } catch (error) {
      console.log("✌️error --->", error);
    }
  };

  return (
    <section className="tp-product-details-area pt-40 product-detail-page common-bg">
      <div className="tp-product-details-top">
        <div className="container">
          <div className="row ">
            <div
              className={`${
                productItem?.media?.length > 1
                  ? "col-xl-7 col-lg-7"
                  : "col-xl-6 col-lg-6"
              } `}
            >
              <div ref={thumbRef} className="manual-sticky-thumb">
                <DetailsThumbWrapper
                  product={productItem}
                  imgWidth={800}
                  imgHeight={740}
                  imgHeightMobile={540}
                  videoId={videoId}
                  status={status}
                  relatedClick={() => relatedClicked()}
                />
              </div>
              {/* product-details-thumb-wrapper start */}

              {/* product-details-thumb-wrapper end */}
            </div>
            <div
              className={`${
                productItem?.media?.length > 1
                  ? "col-xl-5 col-lg-5"
                  : "col-xl-6 col-lg-6"
              } `}
              style={{ zIndex: "1" }}
            >
              {/* product-details-wrapper start */}

              <DetailsWrapper1
                productItem={productItem}
                productRefetch={detailsRefetch}
                handleImageActive={handleImageActive}
                activeImg={productItem?.media[0]?.url}
                detailsBottom={false}
                pageTitle={pageTitle}
                isGiftCard={isGiftCard}
                parentSlug={parentSlug}
              />
              {/* <DetailsWrapper
                productItem={productItem}
                productRefetch={detailsRefetch}
                handleImageActive={handleImageActive}
                activeImg={productItem?.media[0]?.url}
                detailsBottom={false}
                pageTitle={pageTitle}
                isGiftCard={isGiftCard}
                parentSlug={parentSlug}
              /> */}

              {/* product-details-wrapper end */}
            </div>
          </div>
        </div>
      </div>

      {/* product details description */}
      <div className=" pb-40"></div>
      {/* product details description */}

      {router.route == "/gift-card" ? (
        <></>
      ) : (
        <>
        <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
          {/* related products start */}
          {relatedproducts?.length > 0 && (
            <section
              className="tp-related-product pt-40 pb-30 similar-products"
              ref={relatedProductsRef}
              // style={{background:"#fff" ,
              //   //  borderRadius:"20px"
              //   }}
            >
              <div className="container">
                <div className="row">
                  <div className="tp-section-title-wrapper-6 mb-10">
                    {/* <span className="tp-section-title-pre-6">Next day Products</span> */}
                    <h3
                      className="tp-section-title-6"
                      style={{ fontSize: "28px" }}
                    >
                      Similar Products
                    </h3>
                  </div>
                </div>

                <div className="row ">
                  <RelatedProducts
                    products={relatedproducts}
                    relatedProductLoading={isLoading}
                    relatedProductErr={isError}
                    id={productItem?.category[0]?.id}
                  />
                </div>
              </div>
            </section>
          )}

          </motion.div>

          <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >

          {youMayLikeData?.length > 0 && (
            <section className="tp-related-product pt-40 pb-40 you-may-like">
              <div className="container">
                <div className="row">
                  <div className="tp-section-title-wrapper-6 mb-10">
                    {/* <span className="tp-section-title-pre-6">Next day Products</span> */}
                    <h3
                      className="tp-section-title-6"
                      style={{ fontSize: "28px" }}
                    >
                      You May Like This...
                    </h3>
                  </div>
                </div>

                <div className="row m-1">
                  <Swiper
                    {...slider_setting}
                    modules={[Autoplay, Navigation]}
                    className="tp-product-related-slider-active swiper-container mb-10"
                  >
                    {youMayLikeData?.map((item) => (
                      <SwiperSlide key={item._id}>
                        <ProductItem
                          product={item?.data?.product}
                          primary_style={true}
                          data={youMayLikeData}
                        />
                      </SwiperSlide>
                    ))}
                    <div className="tp-related-slider-button-prev swiper-button-prev">
                      <LeftOutlined />
                    </div>
                    <div className="tp-related-slider-button-next swiper-button-next">
                      <RightOutlined />
                    </div>
                  </Swiper>
                </div>
              </div>
            </section>
          )}
          </motion.div>
          
          {reviewList?.length > 0 && <ReviewSection reviewList={reviewList} />}
        </>
      )}

      {/* related products end */}
    </section>
  );
};

export default ProductDetailsArea;
