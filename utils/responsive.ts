import { PixelRatio, Platform, useWindowDimensions } from "react-native";

export const useResponsive = () => {
   const { width, height } = useWindowDimensions();
   const isWeb = Platform.OS === "web";

   // Define desktop threshold
   const isDesktop = isWeb && width >= 768;

   // Base mobile width (Standard 390 is typical for modern phones like iPhone 12/13/14)
   const guidelineBaseWidth = 390;

   /**
    * Returns a scaled value based on current screen width.
    * Caps the scaling on desktop/web to prevent massive inflation of standard sizes.
    */
   const scale = (size: number): number => {
      if (isDesktop) return size;
      const scaledSize = (width / guidelineBaseWidth) * size;
      return Math.round(PixelRatio.roundToNearestPixel(scaledSize));
   };

   /**
    * Moderated scaling for font sizes: scales a bit less aggressively
    * to maintain readability on small vs medium phones.
    */
   const moderateScale = (size: number, factor = 0.5): number => {
      if (isDesktop) return size;
      return size + (scale(size) - size) * factor;
   };

   return {
      width,
      height,
      isWeb,
      isDesktop,
      scale,
      moderateScale,
   };
};
