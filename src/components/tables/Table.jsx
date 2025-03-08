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
import { useNavigate } from 'react-router-dom'
const GlobalFilter = ({
	preGlobalFilteredRows,
	globalFilter,
	setGlobalFilter,
	searchBoxClass,
}) => {
	const count = preGlobalFilteredRows.length
	const [value, setValue] = useState(globalFilter)
	const onChange = useAsyncDebounce((value) => {
		setGlobalFilter(value || undefined)
	}, 200)
	const navigate = useNavigate()

	const handleAdd = () => {
		navigate('/user/add/')
	}
	return (	
		<>
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
			<div className="ms-auto">
				<button type="button" class="me-2 btn btn-secondary" onClick={handleAdd}>ADD</button>
			</div>
		</div>
		</>
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
					// Let's make a column for selection
					{
						id: 'selection',
						// The header can use the table's getToggleAllRowsSelectedProps method
						// to render a checkbox
						Header: ({ getToggleAllPageRowsSelectedProps }) => (
							<div>
								<IndeterminateCheckbox
									{...getToggleAllPageRowsSelectedProps()}
								/>
							</div>
						),
						// The cell can use the individual row's getToggleRowSelectedProps method
						// to the render a checkbox
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
					// Let's make a column for selection
					{
						// Build our expander column
						id: 'expander',
						// Make sure it has an ID
						Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
							<span {...getToggleAllRowsExpandedProps()}>
								{isAllRowsExpanded ? '-' : '+'}
							</span>
						),
						Cell: ({ row }) => 
							// Use the row.canExpand and row.getToggleRowExpandedProps prop getter
							// to build the toggle for expanding a row
							row.canExpand ? (
								<span
									{...row.getToggleRowExpandedProps({
										style: {
											// We can even use the row.depth property
											// and paddingLeft to indicate the depth
											// of the row
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
				/>
			)}

			<div className="table-responsive">
				<table
					{...dataTable.getTableProps()}
					className={clsx(
						'table table-centered react-table',
						props['tableClass']
					)}
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
										return (
											<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
										)
									})}
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>

			{pagination && (
				<Pagination tableProps={dataTable} sizePerPageList={sizePerPageList} />
			)}
		</>
	)
}
export { Table }
