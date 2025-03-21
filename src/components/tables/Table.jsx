import clsx from 'clsx'
import { forwardRef, useEffect, useRef, useState } from 'react'
import {
	useAsyncDebounce,
	useExpanded,
	useGlobalFilter,
	usePagination,
	useRowSelect,
	useSortBy,
	useTable,
} from 'react-table'
import { Pagination } from './Pagination'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from '../../pages/structure/App.module.css'

const GlobalFilter = ({
	preGlobalFilteredRows,
	globalFilter,
	setGlobalFilter,
	searchBoxClass,
	table, // Accepting table prop here
}) => {
	const location = useLocation()
	const isProjectsPath = location.pathname === "/projects/"
	const count = preGlobalFilteredRows.length
	const [value, setValue] = useState(globalFilter)
	const onChange = useAsyncDebounce((value) => {
		setGlobalFilter(value || undefined)
	}, 200)
	const navigate = useNavigate()

	const handleAdd = () => {
		if (table === 'project') {
			navigate('/projects/add/')
		} else {
			navigate('/users/add/')
		}
	}
	const hideAddButton = location.pathname.includes('/timesheets/')
	return (	
		<div className={clsx(searchBoxClass, "d-flex align-items-center")}>
			<span className="d-flex align-items-center">
				Search :{' '}
				<input
					value={value || ''}
					onChange={(e) => {
						setValue(e.target.value)
						onChange(e.target.value)
					}}
					placeholder={`${count} records...`}
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
		</div>
	)
}

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
	const defaultRef = useRef()
	const resolvedRef = ref || defaultRef
	useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate
	}, [resolvedRef, indeterminate])
	return (
		<div className="form-check">
			<input
				type="checkbox"
				className="form-check-input"
				ref={resolvedRef}
				{...rest}
			/>
			<label htmlFor="form-check-input" className="form-check-label"></label>
		</div>
	)
})

const Table = (props) => {
	const isSearchable = props['isSearchable'] || false
	const isSortable = props['isSortable'] || false
	const pagination = props['pagination'] || false
	const isSelectable = props['isSelectable'] || false
	const isExpandable = props['isExpandable'] || false
	const sizePerPageList = props['sizePerPageList'] || []
	const selectPerson = props['selectPerson'] || false
	const table = props['table'] || ''  // Getting table type from props

	const otherProps = {}
	if (isSearchable) {
		otherProps['useGlobalFilter'] = useGlobalFilter
	}
	if (isSortable) {
		otherProps['useSortBy'] = useSortBy
	}
	if (isExpandable) {
		otherProps['useExpanded'] = useExpanded
	}
	if (pagination) {
		otherProps['usePagination'] = usePagination
	}
	if (isSelectable) {
		otherProps['useRowSelect'] = useRowSelect
	}

	const dataTable = useTable(
		{
			columns: props['columns'],
			data: props['data'],
			initialState: {
				pageSize: props['pageSize'] || 10,
			},
		},
		'useGlobalFilter' in otherProps && otherProps['useGlobalFilter'],
		'useSortBy' in otherProps && otherProps['useSortBy'],
		'useExpanded' in otherProps && otherProps['useExpanded'],
		'usePagination' in otherProps && otherProps['usePagination'],
		'useRowSelect' in otherProps && otherProps['useRowSelect'],
		(hooks) => {
			isSelectable &&
				hooks.visibleColumns.push((columns) => [
					{
						id: 'selection',
						Header: ({ getToggleAllPageRowsSelectedProps }) => (
							<div>
								<IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
							</div>
						),
						Cell: ({ row }) => (
							<div>
								<IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
							</div>
						),
					},
					...columns,
				])
			isExpandable &&
				hooks.visibleColumns.push((columns) => [
					{
						id: 'expander',
						Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
							<span {...getToggleAllRowsExpandedProps()}>
								{isAllRowsExpanded ? '-' : '+'}
							</span>
						),
						Cell: ({ row }) => 
							row.canExpand ? (
								<span
									{...row.getToggleRowExpandedProps({
										style: {
											paddingLeft: `${row.depth * 2}rem`,
										},
									})}
								>
									{row.isExpanded ? '-' : '+'}
								</span>
							) : null,
					},
					...columns,
				])
		}
	)

	const rows = pagination ? dataTable.page : dataTable.rows

	return (
		<>
			{isSearchable && (
				<GlobalFilter
					preGlobalFilteredRows={dataTable.preGlobalFilteredRows}
					globalFilter={dataTable.state.globalFilter}
					setGlobalFilter={dataTable.setGlobalFilter}
					searchBoxClass={props['searchBoxClass']}
					table={table} 
				/>
			)}

			<div className="table-responsive">
				<table
					{...dataTable.getTableProps()}
					className={clsx('table table-centered react-table', props['tableClass'])}
				>
					<thead className={props['theadClass']}>
						{dataTable.headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th
										{...column.getHeaderProps(
											column.defaultCanSort && column.getSortByToggleProps()
										)}
										className={clsx({
											sorting_desc: column.isSortedDesc === true,
											sorting_asc: column.isSortedDesc === false,
											sortable: column.defaultCanSort === true,
										})}
									>
										{column.render('Header')}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...dataTable.getTableBodyProps()}>
						{(rows || []).map((row) => {
							dataTable.prepareRow(row)
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map((cell) => {
										return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
									})}
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>

			{pagination && <Pagination tableProps={dataTable} sizePerPageList={sizePerPageList} selectPerson={selectPerson}/>}
		</>
	)
}

export { Table }
