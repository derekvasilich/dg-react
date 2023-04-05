import { isEmpty } from "lodash";
import EngineDetails from "./engine-details";

export default function VehicleDescription({ description }) {
    let $engines = !isEmpty(description.engine[0]) ? description.engine : [ description.engine ];
    let $count = $engines.length;
    let engineClass = $count > 1 ? 'span6' : 'span12'

    let engineDetails = ''
    if ( $engines ) {
        engineDetails = $engines.map(($engine, index) => <EngineDetails key={ index } $engine={ $engine } engineclassName={ engineClass } /> )
    }

    return (
        <>
            { $engines ? (
                <> 
                    <h3>Engine</h3>          
                    <div className="row-fluid">
                        { engineDetails }            
                    </div>
                </>
            ) : (<></>) }

            {/* { !isEmpty(description.standard) ? (
                <>
                    <h3>Standard Equipment</h3>
                
                    <div className="wrapTable">
                        <table className="table table-striped table-condensed table-bordered">
                            <?
                            $cols = 6;
                            $categories = Hash::combine(description.standard, '{n}.description', '{n}.description', '{n}.header._');
                            foreach ($categories as $categoryName => $category) {
                                $stndChunks = array_chunk($category, $cols); 
                                $rows = count($stndChunks);
                                }	
                                    <thead>
                                        <tr>
                                            <th colspan="{$cols}">{$categoryName}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <? foreach (range(0, $rows-1) as $row) : }
                                        <tr>
                                            <? foreach (range(0, $cols-1) as $col) : }
                                                <td width="{100/$cols}%">{@$stndChunks[$row][$col]}</td>
                                            <? endforeach; }
                                        </tr>
                                    <? endforeach; }
                                    </tbody>
                                <?
                            }
                            }
                        </table>
                    </div>       
                </>     
            ) : (<></>) }

        
            <? if (false && !isEmpty(description.factoryOption)) : }
                <h3>Factory Options</h3>
                
                <div className="wrapTable">
                <table className="table table-striped table-condensed table-bordered">
                <?
                $cols = 6;
                $categories = @Hash::combine(description.factoryOption, '{n}.description', '{n}.description', '{n}.header._');
                foreach ($categories as $categoryName => $category) {
                    $stndChunks = array_chunk($category, $cols); 
                    $rows = count($stndChunks);
                    }	
                        <thead>
                            <tr>
                                <th colspan="{$cols}">{$categoryName}</th>
                            </tr>
                        </thead>
                        <tbody>
                        <? foreach (range(0, $rows-1) as $row) : }
                            <tr>
                                <? foreach (range(0, $cols-1) as $col) : }
                                    <td width="{100/$cols}%">{@$stndChunks[$row][$col]}</td>
                                <? endforeach; }
                            </tr>
                        <? endforeach; }
                        </tbody>
                    <?
                }
                }
                </table>
                </div>
            <? endif; } */}
    
        </>
    )
}