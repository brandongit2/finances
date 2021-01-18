import {configureStore} from '@reduxjs/toolkit';

import {userInfoSlice} from './slices';

export default configureStore({
    reducer: {
        userInfo: userInfoSlice.reducer
    }
});
