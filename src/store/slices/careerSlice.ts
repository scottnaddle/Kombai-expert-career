import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface CareerProject {
  id?: string;
  projectName: string;
  company: string;
  department: string;
  position: string;
  startDate: string;
  endDate: string;
  role: string;
  countries: string[];
  industries: string[];
  businessTypes: string[];
  achievements: string;
  quantitativeResults: string;
  isActive: boolean;
}

export interface CareerExperience {
  id?: string;
  company: string;
  department: string;
  position: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
  projects: CareerProject[];
}

interface CareerState {
  experiences: CareerExperience[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CareerState = {
  experiences: [],
  isLoading: false,
  error: null,
};

export const fetchCareerExperiences = createAsyncThunk(
  'career/fetchExperiences',
  async (_, { getState }) => {
    const state = getState() as { auth: { token: string | null } };
    
    const response = await fetch('/api/career', {
      headers: {
        'Authorization': `Bearer ${state.auth.token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('경력 정보를 불러오는데 실패했습니다.');
    }
    
    const data = await response.json();
    return data;
  }
);

export const addCareerExperience = createAsyncThunk(
  'career/addExperience',
  async (experience: CareerExperience, { getState }) => {
    const state = getState() as { auth: { token: string | null } };
    
    const response = await fetch('/api/career', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${state.auth.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(experience),
    });
    
    if (!response.ok) {
      throw new Error('경력 추가에 실패했습니다.');
    }
    
    const data = await response.json();
    return data;
  }
);

export const updateCareerExperience = createAsyncThunk(
  'career/updateExperience',
  async (experience: CareerExperience, { getState }) => {
    const state = getState() as { auth: { token: string | null } };
    
    const response = await fetch(`/api/career/${experience.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${state.auth.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(experience),
    });
    
    if (!response.ok) {
      throw new Error('경력 수정에 실패했습니다.');
    }
    
    const data = await response.json();
    return data;
  }
);

export const deleteCareerExperience = createAsyncThunk(
  'career/deleteExperience',
  async (experienceId: string, { getState }) => {
    const state = getState() as { auth: { token: string | null } };
    
    const response = await fetch(`/api/career/${experienceId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${state.auth.token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('경력 삭제에 실패했습니다.');
    }
    
    return experienceId;
  }
);

const careerSlice = createSlice({
  name: 'career',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCareerExperiences.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCareerExperiences.fulfilled, (state, action: PayloadAction<CareerExperience[]>) => {
        state.isLoading = false;
        state.experiences = action.payload;
      })
      .addCase(fetchCareerExperiences.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || '경력 정보를 불러오는데 실패했습니다.';
      })
      .addCase(addCareerExperience.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addCareerExperience.fulfilled, (state, action: PayloadAction<CareerExperience>) => {
        state.isLoading = false;
        state.experiences.push(action.payload);
      })
      .addCase(addCareerExperience.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || '경력 추가에 실패했습니다.';
      })
      .addCase(updateCareerExperience.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCareerExperience.fulfilled, (state, action: PayloadAction<CareerExperience>) => {
        state.isLoading = false;
        const index = state.experiences.findIndex(exp => exp.id === action.payload.id);
        if (index !== -1) {
          state.experiences[index] = action.payload;
        }
      })
      .addCase(updateCareerExperience.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || '경력 수정에 실패했습니다.';
      })
      .addCase(deleteCareerExperience.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCareerExperience.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.experiences = state.experiences.filter(exp => exp.id !== action.payload);
      })
      .addCase(deleteCareerExperience.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || '경력 삭제에 실패했습니다.';
      });
  },
});

export const { clearError } = careerSlice.actions;
export default careerSlice.reducer;