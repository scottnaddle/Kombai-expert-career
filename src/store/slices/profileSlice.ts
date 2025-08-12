import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Profile {
  id?: string;
  name: string;
  education: string;
  languages: string;
  certifications: string;
  phone?: string;
  address?: string;
}

interface ProfileState {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  isLoading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk(
  'profile/fetch',
  async (_, { getState }) => {
    const state = getState() as { auth: { token: string | null } };
    
    // TODO: Replace with actual API call
    const response = await fetch('/api/profile', {
      headers: {
        'Authorization': `Bearer ${state.auth.token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('프로필을 불러오는데 실패했습니다.');
    }
    
    const data = await response.json();
    return data;
  }
);

export const updateProfile = createAsyncThunk(
  'profile/update',
  async (profileData: Profile, { getState }) => {
    const state = getState() as { auth: { token: string | null } };
    
    // TODO: Replace with actual API call
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${state.auth.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });
    
    if (!response.ok) {
      throw new Error('프로필 저장에 실패했습니다.');
    }
    
    const data = await response.json();
    return data;
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || '프로필을 불러오는데 실패했습니다.';
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || '프로필 저장에 실패했습니다.';
      });
  },
});

export const { clearError } = profileSlice.actions;
export default profileSlice.reducer;