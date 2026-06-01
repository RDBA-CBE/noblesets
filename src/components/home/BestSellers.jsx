import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import { ArrowNextSm, ArrowPrevSm } from "@/svg";
import { useSetState } from "@/utils/functions";
import { useGetChildCatByParentIdMutation, usePriceFilterMutation } from "@/redux/features/productApi";

const HomeCategorySection = () => {
  const router = useRouter();

  const [state, setState] = useSetState({
    categoryList: [],
    giftCategories: []
  });

  const [priceFilter, { isLoading: productLoading }] = usePriceFilterMutation();
      const [subCatList, { isLoading: productLoadings }] = useGetChildCatByParentIdMutation();
  

  useEffect(() => {
    // categoryList();
    categoryLists()
  }, []);

  const categoryList = async () => {
    const res = await priceFilter({
      filter: { categorySlugs: "best-sellers" },
      sortBy: { direction: "DESC", field: "CREATED_AT" },
      first: 20,
      after: null,
      pageSize:20
    });
    console.log("best seller",res)
    const list = res?.data?.data?.productsSearch?.edges?.map(
      (item) => item?.node,
    );
    console.log(list, "list");
    if (list?.length > 0) {
      const response = list
        ?.filter((item) => item?.media?.length > 1)
        ?.map((item) => ({
          id: item?.id,
          name: item?.name,
          image: item?.media?.[1]?.url,
          price: item?.defaultVariant?.pricing?.price?.gross?.amount,
          slug: item?.slug,
        }));
      setState({ categoryList: response });
    }
  };

  const categoryLists = async () => {
    const res = await subCatList({slug:"best-sellers"});
    const children = res?.data?.data?.category?.children?.edges || [];
    console.log("children",children)
    setState({ giftCategories: children });

    // setGiftCategories(children.map((e) => e.node));
  };


  
  const video_data = [
    {
      img: "/assets/img/newlayout/Best-seller/image-3.png",
      link: "earring",
    },
    {
      img: "/assets/img/newlayout/Best-seller/image-2.png",
      link: "Chain",
    },
    {
      img: "/assets/img/newlayout/Best-seller/image-1.png",
      link: "rings",
    },
    {
      img: "/assets/img/newlayout/Best-seller/image-4.png",
      link: "earring",
    },
    {
      img: "/assets/img/newlayout/Best-seller/image-5.png",
      link: "necklace",
    },
  ];

  const handleClick = (category) => {
    router.push(`/shop?category=${category?.slug}`)
    // router.push({

    //   pathname: `product-details/${
    //     category?.slug}`
    
    // });
  };

  return (
    <section className="pt-60 position-relative h4size bestSellers">
      <div className="container-fluid" style={{ padding: "0px" }}>
        <div className="row">
          <div className="col-12">
            <div className="feature-main mb-50">
              <h5 className="sub-ti">
                <b className="pe-2">✦</b>Curated choices
              </h5>
              <h4 className="feature-adipisicing main-ti">Our Best Sellers</h4>
            </div>
          </div>
        </div>
      </div>

      {/* STATIC IMAGE DISPLAY */}
      <div className="container-fluid pt-3">
        <div className="row justify-content-center">
          <div className="col-11 col-lg-10 col-xl-9">
            <div className="static-bs-wrapper d-none d-md-flex justify-content-between align-items-end gap-0">
              {state.giftCategories?.map((img, index) => (
                <div
                  key={index}
                  className={`bs-slide 
                    ${index === 2 ? "bs-large" : ""} 
                    ${index === 1 || index === 3 ? "bs-medium" : ""} 
                    ${index === 0 || index === 4 ? "bs-small" : ""}
                  `}
                >
                  <img
                    src={img.node?.backgroundImageUrl}
                    alt="Best Seller"
                    className="bs-img"
                    onClick={() => {
                      handleClick(img?.node);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="d-md-none px-3">
            <Swiper
              slidesPerView={3}
              spaceBetween={12}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              modules={[Navigation, Autoplay]}
              navigation={{
                nextEl: ".tp-brand-slider-button-next",
                prevEl: ".tp-brand-slider-button-prev",
              }}
              breakpoints={{
              
                576: {
                  slidesPerView: 3,
                },
                0: {
                  slidesPerView: 2,
                },
              }}
              className="bs-mobile-slider"
            >
              {state.categoryList?.slice(0,5)?.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img.image}
                    alt="Best Seller"
                    className="bs-img"
                    onClick={() => {
                      handleClick(img);
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="tp-brand-slider-arrow">
              <button className="tp-brand-slider-button-prev">
                <ArrowPrevSm />
              </button>
              <button className="tp-brand-slider-button-next">
                <ArrowNextSm />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCategorySection;
