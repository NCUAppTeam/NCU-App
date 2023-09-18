import { Box, Heading, NativeBaseProvider, extendTheme } from 'native-base';
import React from 'react';
import { styles } from '../stylesheet';
//預設為Dark Mode
function EventMainScreen({navigation}:any){
    const config = {
        useSystemColorMode: false,
        initialColorMode: 'dark',
    };

    const customTheme = extendTheme({ config });    

    return(
        <NativeBaseProvider theme={customTheme}>
            <Box style={styles.container}>
                <Heading size="lg" marginLeft={140}>活動列表</Heading>
            </Box>
        </NativeBaseProvider>
    );
};
export default EventMainScreen;

