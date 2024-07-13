import { GenericSlide, PluginProps } from "yet-another-react-lightbox";

declare module "yet-another-react-lightbox" {
  export interface YouTubeSlide extends GenericSlide {
    type: "youtube";
    src: string;
    title: string;
    width: number;
    height: number;
  }

  interface SlideTypes {
    youtube: YouTubeSlide;
  }
}

export default function YouTube({ augment }: PluginProps) {
  augment(({ render: { slide: renderSlide, ...restRender }, ...rest }) => ({
    render: {
      slide: ({ slide, rect, ...restSlide }) =>
        slide.type === "youtube" ? (
          <iframe
            width={Math.min(
              slide.width,
              rect.width,
              (slide.width * rect.height) / slide.height
            )}
            height={Math.min(
              slide.height,
              rect.height,
              (slide.height * rect.width) / slide.width
            )}
            src={slide.src}
            title={slide.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          renderSlide?.({ slide, rect, ...restSlide })
        ),
      ...restRender,
    },
    ...rest,
  }));
}
