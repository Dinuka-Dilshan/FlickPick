import { Swiper, SwiperSlide } from "swiper/react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "swiper/css";

type Props<T> = {
  list: T[];
  itemsPerView: number;
  itemRenderer: (item: T) => React.ReactNode;
  getId: (item: T) => string | number;
};

const Slider = <T,>({ itemsPerView, list, getId, itemRenderer }: Props<T>) => {
  return (
    <Swiper spaceBetween={10} slidesPerView={itemsPerView}>
      {list?.map((item) => (
        <SwiperSlide
          key={getId(item)}
          style={{ height: "auto", alignSelf: "stretch" }}
        >
          {itemRenderer(item)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
