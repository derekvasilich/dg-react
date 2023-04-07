import { formatCurrency } from "@/utils"
import { useEffect } from 'react';
import Link from 'next/link'
import Attachment from "@/components/attachment"
import VehicleDescription from "@/components/vehicle-description"
import { getVehicleById, selectCurrentVehicle, selectLoading } from "@/store/vehicleSlice"
import { useDispatch, connect } from 'react-redux';
import { useRouter } from "next/router";
import DGCarousel from "@/components/dg-carousel";
import { isEmpty } from "lodash";

const VehicleDisplay = ({ vehicleId, currentVehicle, isLoading }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    let attachmentItmes = currentVehicle.attachments?.map((attachment, index) => 
        <Attachment key={index} attachment={attachment} />
    )    

    useEffect(() => {
        if (router.isReady) {
            const vehicleId = router.query.vehicleId
            dispatch(getVehicleById(vehicleId))
        }
    }, [router.isReady, dispatch, router.query.vehicleId])

    if (isLoading) {
        return <p>Loading...</p>
    }

    let stockImages = []
    if (currentVehicle?.description?.description?.style) {
        let styles = !isEmpty(currentVehicle?.description?.description?.style[0]) ? 
            currentVehicle?.description?.description?.style :
            [currentVehicle?.description?.description?.style];
        stockImages = styles.map((style) => { return { ...style.stockImage, alt: currentVehicle.name || `${style.division._} ${style.model._} ${style.name}` } })
    }
    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-header">
                <h4 className="my-0 fw-normal">{currentVehicle.name}</h4>
            </div>
            <div className="card-body">
            <h1 className="card-title pricing-card-title">{ formatCurrency(currentVehicle.price) }</h1>
                <DGCarousel images={ stockImages } />
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <td>ID</td>
                            <td>{currentVehicle.id}</td>
                        </tr>
                        <tr>
                            <td>VIN</td>
                            <td>{currentVehicle.vin}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>{currentVehicle.name}</td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td>{formatCurrency(currentVehicle.price)}</td>
                        </tr>
                        { attachmentItmes }
                    </tbody>
                </table>
                { currentVehicle.description ? (	  	  
                    <VehicleDescription vehicle={ currentVehicle }
                        description={ currentVehicle.description.description }
                        />
                ) : (<></>) }
                <Link href={ '/vehicles' } 
                    className="w-100 btn btn-outline-primary">
                        <i className="fa fa-chevron-left"></i> Back
                </Link>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentVehicle: selectCurrentVehicle(state),
    isLoading: selectLoading(state)
})

const mapDispatchToProps = () => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VehicleDisplay)