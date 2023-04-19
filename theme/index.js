import { extendTheme } from 'native-base';

export const BaseTheme = extendTheme({
	components: {
		Text: {
			defaultProps: {
				fontSize: 'lg',
			},
		},
	},
	colors: {
        primary: {
            600: '#476685',
            100: '#E5EBF1',
        },
	},
	config: {
		// Changing initialColorMode to 'dark'
		// initialColorMode: 'dark',
	},
});