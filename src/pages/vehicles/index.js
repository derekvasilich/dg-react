
import { useEffect } from 'react';
import Link from 'next/link';
import VehicleSearch from '@/components/vehicle-search';
import { formatCurrency } from '@/utils'
import { useDispatch, connect } from 'react-redux';
import { getVehicles, selectVehicles, selectFilteredVehicles } from '@/store/vehicleSlice';
import { selectLoading } from '@/store/authSlice';
import { useRouter } from 'next/router';

function VehicleListItem({ vehicle }) {
    return (
		<tr>
			<td>{vehicle.vin}</td>
			<td>{vehicle.name}</td>
			<td style={{ textAlign: 'right' }}>{formatCurrency(vehicle.price)}</td>
			<td style={{ textAlign: 'right' }}>
                <Link href={ '/vehicles/'+vehicle.id }
                    className="btn btn-outline-primary">
                    View
                </Link>
            </td>
		</tr>
    )
}

const VehicleList = ({ vehicles, filteredVehicles, filters, setFilters, minMaxPrice, isLoading }) => {
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        if (router.isReady) {
            dispatch(getVehicles())
        }
    }, [router.isReady, dispatch])

    let vehicleItems = filteredVehicles.map(vehicle => 
        <VehicleListItem key={ vehicle.id } 
            vehicle={ vehicle }
             />
    )

    if (isLoading) {
        return (
            <>
                <VehicleSearch vehicles={ filteredVehicles }
                    isLoading={ isLoading }
                    filters={ filters } 
                    minMaxPrice={ minMaxPrice }
                    onFilterChange={ setFilters } />
                Loading...
            </>
        )
    }

    return (
        <>
            <VehicleSearch vehicles={ filteredVehicles } 
                isLoading={ isLoading }
                filters={ filters } 
                minMaxPrice={ minMaxPrice }
                onFilterChange={ setFilters } />
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Name</th>	
                        <th style={{ textAlign: 'right' }}>Price</th>	
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { vehicles ? vehicleItems : 'No vehicles' }
                </tbody>
            </table>
        </>
    ) 
}

const mapStateToProps = (state) => ({
    vehicles: selectVehicles(state),
    filteredVehicles: selectFilteredVehicles(state),
    isLoading: selectLoading(state)
})

const mapDispatchToProps = () => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VehicleList)