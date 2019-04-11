import { StyleSheet, Platform } from 'react-native';

export const IconSize = {
    LARGE_LIST_ICON: 40,
    MEDIUM_LIST_ICON: 24,
    SMALL_LIST_ICON: 10,
};

export const Colors = {
    BLACK: '#000000',
    WHITE: '#FFFFFF',
    LIGHTISH_GRAY: '#9B9B9B',
    PINKISH_GRAY: '#BBBBBB',
    LIGHT_GRAY: '#D3D3D3',
    LIGHTER_GRAY: '#E6E6E6',
    VERY_LIGHT_GRAY: '#F8F8F8',
    GRAY: '#808080',
    DARK_GRAY: '#4A4A4A',
    BRAND_PURPLE: '#6200EA',
    BRAND_PURPLE_LIGHT: '#BA76FA',
};
export const ComponentColors = {
    STRONG_TEXT: '#303030',
    TEXT_COLOR: Colors.GRAY,
    BACKGROUND_COLOR: '#DDDDDD',
    DISABLED_BUTTON_COLOR: Colors.LIGHT_GRAY,
    BUTTON_COLOR: Colors.DARK_GRAY,
    NAVIGATION_BUTTON_COLOR: Colors.WHITE,
    HEADER_COLOR: Colors.BRAND_PURPLE,
    TAB_ACTIVE_COLOR: Colors.BLACK,
    TAB_INACTIVE_COLOR: Colors.PINKISH_GRAY,
    TAB_ACTION_BUTTON_COLOR: Colors.BRAND_PURPLE,
    TAB_ACTION_BUTTON_ICON_COLOR: Colors.WHITE,
};

export const defaultBoldFont = 'Roboto-Bold';
export const defaultRegularFont = 'Roboto-Regular';
export const defaultMediumFont = 'Roboto-Medium';
export const defaultFont = defaultRegularFont;
export const defaultTextProps = {
    style: {
      fontFamily: defaultFont,
      fontSize: 15,
    },
};

export const DefaultStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    faviconLarge: {
        borderRadius : 20,
        width: IconSize.LARGE_LIST_ICON,
        height: IconSize.LARGE_LIST_ICON,
    },
    faviconMedium: {
        borderRadius : 12,
        width: IconSize.MEDIUM_LIST_ICON,
        height: IconSize.MEDIUM_LIST_ICON,
    },
});

export const DefaultNavigationBarHeight = 44;
export const DefaultTabBarHeight = 50;

export const BACK_ICON_NAME = 'md-arrow-back';
