import DateTimePicker from '@react-native-community/datetimepicker';
import { Box, Heading, NativeBaseProvider, VStack, Input, extendTheme, Button, HStack, IconButton } from 'native-base';
import React, { useState } from 'react';
import { Text, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from '../stylesheet';
import { ImagePickerResult, launchImageLibraryAsync } from 'expo-image-picker';
import { NavigationContainer } from '@react-navigation/native';
//預設為Dark Mode
function EventMainScreen({navigation}){
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

