import React from 'react';
import './../../manage_listing.css'

class Cleanfee extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        const taxable_container_css = {
            marginTop: '40px'
        };
        return(
            <div className="base_priceamt">
                <div className="base_decs">
                    <h4>Cleaning Fee: </h4>
                    <div style={taxable_container_css}>
                        <label className="h6 pl-1 col-lg-12 col-xl-4">TAXABLE?<i rel="tooltip" className="icon icon-question" title="The taxable selection of the cleaning fee." /></label>
                        <div className="radio-group col-lg-12 col-xl-8">
                            <div className="form-group row pl-2 or-2">
                                <div className="radio radio-inline">
                                    <label>
                                        <input type="radio" name="cleaning_taxable" checked={this.props.cleaning_taxable === "Yes"} value="Yes" onChange={this.props.onChange}/>
                                        <i className="helper"></i>Yes
                                    </label>
                                </div>
                                <div className="radio radio-inline ml-2">
                                    <label>
                                        <input type="radio" name="cleaning_taxable" checked={this.props.cleaning_taxable !== "Yes"} value="No" onChange={this.props.onChange}/>
                                        <i className="helper"></i>No
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="base_text">
                <div className="col-xl-6 col-lg-12 base_amut bottom_space">
                    <label className="h6"> Cleaning fee</label>
                    <div className="base_pric">
                        <div className="price_doller input-prefix">{this.props.code}</div>
                        <input type="number" min={0} limit-to={9} data-extras="true" id="price-select-cleaning_fee" name="cleaning"  className="autosubmit-text input-stem input-large" data-saving="additional-saving" value={this.props.fee_value} onChange={this.props.onChange} />
                    </div>
                    <p data-error="cleaning" className="ml-error" />
                </div>
                <div className="col-xl-6 col-lg-12 base_amut">
                    <label className="h6">Cleaning Fee calculation</label>
                    <div className="base_select select">
                    <select name="cleaning_fee_type" data-saving="additional-saving" className="rjpricesec" value={this.props.type_value} onChange = {this.props.onChange}>
                        <option value={0}> Single Fee </option>
                        <option value={1}> Per Night </option>
                        <option value={2}> Per Guest </option>
                        <option value={3}> Per Night &amp; Guest </option>
                    </select>
                    </div>
                    <p data-error="cleaning_fee_type" className="ml-error" />
                </div>
                </div>
            </div>
        )
    }
}

export default Cleanfee;
