import { formatCurrency } from "@/utils"
import { useSelector, useDispatch } from "react-redux"
import { selectFilters, selectMinMaxPrice, selectLoading, applyFilters } from '@/store/vehicleSlice'
import { useState } from "react"
import { useEffect } from 'react';

export default function VehicleSearch({ 
    vehicles
}) {
    const dispatch = useDispatch()
    const filters = useSelector(selectFilters)
    const [fields, setFields] = useState({
        sort: filters.sort || undefined, 
        min: filters.min || undefined, 
        max: filters.max || undefined,
        query: filters.query || undefined
    })
    const isLoading = useSelector(selectLoading)
    const minMaxPrice = useSelector(selectMinMaxPrice)

    useEffect(() => {
        dispatch(applyFilters({}))
    }, [minMaxPrice, dispatch])

    let handleInputChange = function(key, value) {
        let ret = {...fields}
        ret[key] = value
        setFields(ret)
        console.log(ret)
    }

    let queryDetails = formatCurrency(fields.min || minMaxPrice[0]) + ' - ' + formatCurrency(fields.max || minMaxPrice[1])

    let sortOptions = [
        ['','Select...'],
        ['id','ID'], 
        ['name','Name'], 
        ['vin','Vin'], 
        ['price','Price']
    ].map(opt =>
         <option key={ opt[0] } value={ opt[0] }>{ opt[1] }</option>
    )

    return (
        <>
            <div className="mb-3">
                <label className="form-label">Search</label>
                <input className="form-control" 
                    value={ fields.query }
                    onChange={ (e) => handleInputChange('query', e.target.value) }
                    onInput={ (e) => dispatch(applyFilters({...fields, 'query':e.target.value})) }
                    disabled={ isLoading }
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Sort by</label>
                <select 
                    value={ fields.sort }
                    className="form-select"
                    // onChange={ (e) => handleInputChange('sort', e.target.value) }
                    onInput={ (e) => dispatch(applyFilters({...fields, 'sort': e.target.value})) }
                    disabled={ isLoading }
                >
                    { sortOptions }
                </select>
                <div id="emailHelp" className="form-text">
                    {vehicles.length} vehicles found { isLoading ? '' : queryDetails }
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="customRange2" className="form-label">Minimum Price</label>
                <input type="range" className="form-range" 
                    value={ fields.min || 0 }
                    disabled={ isLoading }
                    min={ minMaxPrice[0] }
                    max={ minMaxPrice[1] }
                    onChange={ (e) => handleInputChange('min', e.target.value) }
                    onMouseUp={ (e) => dispatch(applyFilters({...fields, 'min':e.target.value})) }
                />	
            </div>        
            <div className="mb-3">
                <label htmlFor="customRange2" className="form-label">Maximum Price</label>
                <input type="range" className="form-range"
                    value={ fields.max || minMaxPrice[1] }
                    disabled={ isLoading }
                    min={ minMaxPrice[0] }
                    max={ minMaxPrice[1] }
                    onChange={ (e) => handleInputChange('max', e.target.value) }
                    onMouseUp={ (e) => dispatch(applyFilters({...fields, 'max':e.target.value})) }
                />	
            </div>        
        </>
    )
}