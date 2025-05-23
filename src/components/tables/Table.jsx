import clsx from 'clsx'
import { forwardRef, useEffect, useRef, useState } from 'react'
import {
	defaultColumn,
	useAsyncDebounce,
	useExpanded,
	useGlobalFilter,
	usePagination,
	useRowSelect,
	useSortBy,
	usesuccessAndCatchErrorToastOptions,
} from 'react-table'
import { Pagination } from './Pagination'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styles from '../../pages/structure/App.module.css'


const Table = (props) => {
	const pagination = props['pagination'] || false
	const sizePerPageList = props['sizePerPageList'] || []
	const selectPerson = props['selectPerson'] || false
	const table = props['table'] || '' 
	const columns = props['columns']
	const loading = props['loading'] || false
	const data = props['data']
	const pageNo = props['pageNo'] || 1
	const limit = props['limit'] || 1
	const sortColumn = props['sortColumn']


	return (
		<>
			{/* <div className="d-flex align-items-center">
			<span className="d-flex align-items-center">
				Search :{' '}
				<input
					// value={value || ''}
					// onChange={(e) => {
					// 	setValue(e.target.value)
					// 	onChange(e.target.value)
					// }}
					// placeholder={`${count} records...`}
					className="form-control w-auto ms-1"
				/>
			</span>
		
			{!hideAddButton && (			
				<div className="ms-auto d-flex align-items-center">
					{isProjectsPath && (
						<span 
							className={`text-muted fs-6 ${styles.cursorPointer} me-4  ${styles.history}`}
							onClick={() => navigate('/history/')} 
						>
							<i className="mdi mdi-history mdi-18px"></i> History
						</span>
					)}
					<button type="button" className="btn btn-primary" onClick={handleAdd}>ADD</button>
				</div>
			)}
		</div> */}

		<div className="table-responsive">
            <table
                className={clsx('table table-centered react-table')}
            >
            <thead >
                <tr>
                    <th>Sno</th>
                    {columns.map(({ key, label }) => (
                        <th 
                            key={key} 
                            onClick={() => handleSort(key)} 
                            className=""
                        >
                            {label}
                            {sortColumn === key ? (sortOrder === "ASC" ? " 🔼" : " 🔽") : ""}
                        </th>
                    ))}
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {loading ? (
                    <tr>
                        <td 
                            colSpan="7" 
                            className="text-center"
                        >Loading...
                        </td>
                    </tr>
                ) : data.length > 0 ? (
                    data.map((user, index) => (
                        <tr key={index}>
                            <td>{(pageNo - 1) * limit + index + 1}</td>
                            <td>{(pageNo - 1) * limit + index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.emailId}</td>
                            <td>{user.role}</td>
                            <td>{user.status === 1 ? 'Active' : ''}</td>
                            <td>{user.createdName}</td>
                            <td>
                                {/* <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="currentColor" 
                                    className="bi bi-info-circle mr-2 focus me-1 iconSizing" 
                                    viewBox="0 0 16 16" 
                                    // onClick={()=> handleReadBlockById(block.blockId)}
                                >
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                                </svg> */}
                                <Link to="" >
                                    <i className="las la-info-circle text-secondary font-20" />
                                </Link>
                                <Link to="">
                                    <i className="las la-pen text-secondary font-20" />
                                </Link>
                                <Link to="">
                                    <i className="las la-trash-alt text-secondary font-20" />
                                </Link>
                                {/* <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="currentColor" 
                                    className="bi bi-pencil-square mr-2 focus me-1 iconSizing" 
                                    viewBox="0 0 16 16"
                                    // onClick={() => navigate(`/block/${block.blockId}/`)}
                                >
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path 
                                        fill-rule="evenodd" 
                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                    />
                                </svg> */}
                                {/* <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill="currentColor" 
                                    className="bi bi-trash focus iconSizing" 
                                    // onClick={()=> handleDeleteBlockById(block.blockId)} 
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                </svg> */}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td 
                            colSpan="7" 
                            className="text-center small"
                        >No results found.
                        </td>
                    </tr>
                )}
            </tbody>

            </table>
        </div>
			{pagination && <Pagination tableProps={dataTable} sizePerPageList={sizePerPageList} selectPerson={selectPerson}/>}
		</>
	)
}

export { Table }
