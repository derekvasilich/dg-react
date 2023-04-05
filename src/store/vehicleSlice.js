import { vehicleService } from '@/services'
import { createSlice } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash'

export const vehicleSlice = createSlice({
  name: 'vehicles',
  initialState: {
    filters: {
        sort: undefined, 
        min: 0, 
        max: Infinity,
        query: undefined
    },          
    minMaxPriceRange: [0, Infinity],
    vehicles: [],
    filteredVehicles: [],
    currentVehicle: {},
    exception: null,
    loading: {}
  },
  reducers: {
    setLoading: (state, action) => {
        state.loading = action.payload
    },
    setException: (state, action) => {
        state.exception = action.payload
    },  
    setVehicles: (state, action) => {
        state.vehicles = action.payload
    },
    setCurrentVehicle: (state, action) => {
        state.currentVehicle = action.payload
    },
    applyFilters(state, action) {
        state.filters = {...state.filters, ...action.payload}        
        const { filters } = state
        if (typeof state.vehicles.map !== 'function' || typeof filters === 'undefined') {
            return []
        }
        let filtered = state.vehicles.filter(vehicle => {
            !vehicle.name && (vehicle.name = '')
            !vehicle.price && (vehicle.price = 0)
            if (parseFloat(vehicle.price) < parseFloat(filters.min)) {
                return false
            }
            if (parseFloat(vehicle.price) > parseFloat(filters.max)) {
                return false
            }
            if (typeof filters.query !== 'undefined' && vehicle.name.indexOf(filters.query) === -1) {
                return false
            }
            return true
        })
        if (typeof state.filteredVehicles.sort !== 'undefined') {
            filtered.sort((a, b) => {
                !a.name && (a.name = '')
                !b.name && (b.name = '')
                !a.vin && (a.vin = '')
                !b.vin && (b.vin = '')
                switch (filters.sort) {
                    case 'id':      return parseInt(a.id) - parseInt(b.id);
                    case 'price':   return parseFloat(a.price) - parseFloat(b.price);
                    case 'name':    return a.name.localeCompare(b.name);
                    case 'vin':     return a.vin.localeCompare(b.vin);
                }
            })
        }
        state.filteredVehicles = filtered
    },
    calculateMinMaxPrice: (state) => {
        if (state.vehicles.length === 0) {
            state.minMaxPriceRange = [0, Infinity]
            return
        }
        state.minMaxPriceRange = state.vehicles.reduce((acc, vehicle) => {
            !vehicle.price && (vehicle.price = 0)
            acc[0] = ( parseFloat(vehicle.price) < acc[0] ) ? parseFloat(vehicle.price) : acc[0]
            acc[1] = ( parseFloat(vehicle.price) > acc[1] ) ? parseFloat(vehicle.price) : acc[1]
            return acc;
        }, [Infinity, 0])
    }
  },
})

// Action creators are generated for each case reducer function
export const { setVehicles, setCurrentVehicle, setLoading, setException, calculateMinMaxPrice, applyFilters } = vehicleSlice.actions

export const getVehicles = () => (dispatch, useState) => {
    const state = useState()
    dispatch(setLoading(true))
    dispatch(setException(null))
    if (!isEmpty(state.vehicles.vehicles)) {
        dispatch(setVehicles(state.vehicles.vehicles))
        dispatch(calculateMinMaxPrice())
        dispatch(setLoading(false))
        return
    }
    vehicleService.getAll()
        .then((req) => {
            if (req.data.data) {
                dispatch(setVehicles(req.data.data.allVehicles))
                dispatch(calculateMinMaxPrice())    
            } else {
                setException(req.data.errors[0])
            }
        })
        .catch((e) => {
            console.log(e)
            dispatch(setException(e.response.data))
        })
        .finally(() => {
            dispatch(setLoading(false))
        })        
}

export const getVehicleById = (vehicleId) => (dispatch) => {
    dispatch(setLoading(true))
    dispatch(setException(null))
    vehicleService.get(vehicleId)
        .then((req) => {
            dispatch(setCurrentVehicle(req.data))
        })
        .catch((e) => {
            console.log(e)
            dispatch(setException(e.response.data))
        })
        .finally(() => {
            dispatch(setLoading(false))
        })        
}

export const selectFilters = (state) => state.vehicles.filters
export const selectVehicles = (state) => state.vehicles.vehicles
export const selectFilteredVehicles = (state) => state.vehicles.filteredVehicles
export const selectCurrentVehicle = (state) => state.vehicles.currentVehicle
export const selectException = (state) => state.vehicles.exception
export const selectLoading = (state) => state.vehicles.loading
export const selectMinMaxPrice = (state) => state.vehicles.minMaxPriceRange

export default vehicleSlice.reducer