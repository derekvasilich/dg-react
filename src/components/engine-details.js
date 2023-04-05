import { isEmpty } from "lodash";

export default function EngineDetails({ $engine, engineClass }) {
    return (
        <div className={ engineClass }>
            <h3>{ $engine.engineType._ }</h3>
            <dl className="dl-horizontal">
                <dt>Fuel Type</dt>
                <dd>{ $engine.fuelType._ }</dd>

                <dt>Horsepower</dt>
                <dd>{ $engine.horsepower?.value  } at { $engine.horsepower?.rpm } rpm</dd>

                <dt>Net Torque</dt>
                <dd>{ $engine.netTorque?.value  } at { $engine.netTorque?.rpm } rpm</dd>

                <dt>Cylinders</dt>
                <dd>{ $engine.cylinders }</dd>

                <dt>Displacement</dt>
                { !isEmpty($engine.displacement?.value[0]) ? (
                    <dd>{ $engine.displacement.value[0]._ } { $engine.displacement.value[0].unit }</dd>
                ) : (
                    <dd>{ $engine.displacement?.value._ } { $engine.displacement?.value.unit }</dd>
                ) }
                <dt>Fuel Economy (City)</dt>
                <dd>{ $engine.fuelEconomy?.city.low } - { $engine.fuelEconomy?.city.high } { $engine.fuelEconomy?.unit }</dd>

                <dt>Fuel Economy (Highway)</dt>
                <dd>{ $engine.fuelEconomy?.hwy.low } - { $engine.fuelEconomy?.hwy.high } { $engine.fuelEconomy?.unit }</dd>

                <dt>Fuel Capacity</dt>
                <dd>{ $engine.fuelCapacity?.low } - { $engine.fuelCapacity?.high } { $engine.fuelCapacity?.unit }</dd>

                <dt>Installed</dt>
                <dd>{ !isEmpty($engine.installed) ? 'Yes' : 'No' }</dd>

                <dt>High Output</dt>
                <dd>{ $engine.highOutput ? 'Yes' : 'No' }</dd>
            </dl>
        </div>        
    )    
}