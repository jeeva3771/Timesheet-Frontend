import { FormInputPassword, PageBreadcrumb, SelectInput } from '@/components'
import FormInput from '@/components/form/FormTextInput'
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Col,
    Form,
    FormControl,
    FormLabel,
    FormSelect,
    InputGroup,
    Row,
} from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'


export const TextualInputs = ({
    value,
    label,
    placeholder,
    type, 
    onChange
}) => {
    const { control } = useForm()
    const navigate = useNavigate()


    // const handleChange = (event) => {
    //     const {value} = event.target
    //     onChange(value)
    //     // const 
    // }

    const handleSubmit = () => {
        navigate("/projects/")
    }
    return (
        <>
        <PageBreadcrumb subName="Projects List" title="Add" />
        <Row>
            <Col lg="12">
                <Card>
                    <CardBody>
                        <Row className="d-flex justify-content-center">
                        
                            <Col lg="6">
                                <h2 className="text-center">Project Form</h2>
                                <Row className="my-4">
                                    <FormInput  
                                        containerClass="mb-3" 
                                        type="text"
                                        control={control}
                                        name="Project Name"
                                        label="Project Name"
                                        value={value}
                                        labelClassName="col-sm-2 col-form-label text-end"
                                        modify={true}
                                        mandatoryField={true}
                                    /> 
                                </Row>

                                <Row className="my-4">
                                    <FormInput  
                                        containerClass="mb-3" 
                                        type="text"
                                        control={control}
                                        name="Client Name"
                                        label="Client Name"
                                        value={value}
                                        labelClassName="col-sm-2 col-form-label text-end"
                                        modify={true}
                                        mandatoryField={true}
                                    /> 
                                </Row>
                                
                                <Row className="mb-3">
                                    <SelectInput
                                        name="Manager Name"
                                        label="Manager Name"
                                        labelClassName="col-sm-2 col-form-label text-end"
                                        containerClass="mb-3"
                                        control={control}
                                        value={value}
                                        modify={true}
                                        mandatoryField={true}
                                    >
                                        <option disabled selected>Select a role</option>
                                        <option>Anand</option>
                                        <option>Dinesh</option>
                                        <option>Ganesh Raj</option>
                                        <option>Ravi Kumar</option>
                                       
                                        
                                    </SelectInput>
                                </Row>

                                <Row className="mb-5">
                                    <Form.Label className="col-sm-2 col-form-label text-end">
                                        Allot Employee <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Col sm="10">
                                        <Select
                                            isMulti
                                            placeholder="Select a employee"
                                            options={[
                                                {
                                                    value: '1',
                                                    label: 'Ram',
                                                },
                                                {
                                                    value: '2',
                                                    label: 'Siva',
                                                },
                                                {
                                                    value: '3',
                                                    label: 'Surya',
                                                },
                                            ]}
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    borderColor: state.isFocused ? "#86b7fe" : "#DDD",
                                                    borderWidth: "0.1px",
                                                    borderRadius: "0.375rem",
                                                    boxShadow: "none",
                                                    minHeight: "34px", 
                                                    border: "1px solid #e8ebf3",
                                                    height: "34px",
                                                    "&:hover": {
                                                        borderColor: "#86b7fe",
                                                    },
                                                }),
                                            }}
                                        />
                                    </Col>
                                    
                                </Row>        

                                <Row className="mb-3">
                                    <FormInput 
                                        containerClass="mb-3" 
                                        type="date"
                                        control={control}
                                        name="Start date"
                                        label="Start Date"
                                        value={value}
                                        labelClassName="col-sm-2 col-form-label text-end"
                                        modify={true}
                                        mandatoryField={true}
                                    /> 
                                </Row>

                                <Row className="mb-3">
                                    <FormInput 
                                        containerClass="mb-3" 
                                        type="date"
                                        control={control}
                                        name="End date"
                                        label="End Date"
                                        value={value}
                                        labelClassName="col-sm-2 col-form-label text-end"
                                        modify={true}
                                        mandatoryField={true}
                                    /> 
                                </Row>

                                <Row className="mb-3">
                                    <SelectInput
                                        name="Status"
                                        label="Status"
                                        labelClassName="col-sm-2 col-form-label text-end"
                                        containerClass="mb-3"
                                        control={control}
                                        value={value}
                                        modify={true}
                                        mandatoryField={true}
                                    >
                                        <option disabled selected>Select a status</option>
                                        <option>Pending</option>
                                        <option>In Progress</option>
                                        <option>Not Started</option>
                                        <option>Completed</option>
                                    </SelectInput>
                                </Row>

                                <Row className="d-flex justify-content-center mb-4">
									<div className="text-center">
										<button 
											type="reset" 
											className="btn btn-secondary me-2" 
										>
											Reset
										</button>
										<button
											type="button"
											className="btn btn-primary"
											onClick={handleSubmit}
										>
										    Submit
										</button>
									</div>
								</Row>
                            </Col>
                            
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
        </>
    )
}

export default TextualInputs

