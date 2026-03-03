# Assets Folder Structure

Theo quy chuẩn của dự án, folder `assets/` được tổ chức như sau:

```
assets/
├── images/          # Hình ảnh (PNG, JPG, SVG, etc.)
├── fonts/           # Custom fonts (TTF, OTF, etc.)
└── icons/           # Icon assets (SVG, PNG, etc.)
```

## 📁 Chi tiết từng folder

### `images/`

- Lưu trữ tất cả hình ảnh của ứng dụng
- Bao gồm: banner, background, avatar, logo, etc.
- Format: PNG, JPG, WebP, SVG

### `fonts/`

- Lưu trữ custom fonts cho ứng dụng
- Format: TTF, OTF
- Config trong app config & Font.loadAsync()

### `icons/`

- Lưu trữ icon assets
- Ưu tiên sử dụng vector format (SVG)
- Fallback: PNG

## 💡 Cách sử dụng

### Sử dụng ảnh

```tsx
import { Image } from "react-native";

<Image
  source={require("@/assets/images/banner.png")}
  style={{ width: 200, height: 100 }}
/>;
```

### Sử dụng custom fonts

```tsx
import { useFonts } from "expo-font";

const [fontsLoaded] = useFonts({
  CustomFont: require("@/assets/fonts/custom.ttf"),
});
```

### Sử dụng Material Icons (recommended)

```tsx
import { MaterialIcons } from "@expo/vector-icons";

<MaterialIcons name="home" size={24} color="black" />;
```

---

**Last Updated**: March 2026
