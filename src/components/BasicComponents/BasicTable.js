import React, { memo, useCallback } from 'react';

import { Grid, Typography } from '@material-ui/core';
//RootComponents
import BasicButton from './BasicButton';
import { deepPurple } from '../../utils/colors';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100%',
	},
	rootSm: {
		minHeight: 530,
		height: '100%',
		maxHeight: 'auto',
		padding: '15px 15px 15px 15px',
		backgroundColor: '#393e46',
		zIndex: '-1',
	},
	addButton: {
		paddingRight: 10,
	},
	sonContainer: {
		padding: '0px 0px 0px 0px',
		backgroundColor: '#222831',
		height: '100%',
		minHeight: 800,
		borderRadius: '15px 15px 15px 15px',
	},
	field: {
		margin: '0px 24px 24px 24px',
	},
	title: {
		margin: '20px 20px 20px 20px',
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: '33.33%',
		flexShrink: 0,
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
	item: {
		backgroundColor: '#40464F',
	},
	table: {
		width: '100%',
		backgroundColor: deepPurple,
		minHeight: '80%',
		maxHeight: 800,
		margin: '0px 24px 0px 24px',
	},
	tablePaper: {
		backgroundColor: '#393e46',
	},
	titleContainer: {
		margin: '20px 20px 20px 20px',
	},
}));

const BasicTable = memo(
	({ title, columns, data, addLink, history, content, deleteMutation }) => {
		const handleDelete = (id) => {
			console.log(id);
			deleteMutation({
				variables: {
					input: {
						id,
					},
				},
			});
		};

		const [page, setPage] = React.useState(0);
		const classes = useStyles();
		const [rowsPerPage, setRowsPerPage] = React.useState(10);
		const handleAddButton = () => {
			history.replace(addLink);
		};
		const handleChangePage = (event, newPage) => {
			setPage(newPage);
		};

		const handleChangeRowsPerPage = useCallback((event) => {
			setRowsPerPage(+event.target.value);
			setPage(0);
		}, []);

		return (
			<Grid container className={classes.root}>
				<Grid
					item
					xs={12}
					container
					alignItems='center'
					className={classes.titleContainer}
				>
					<Grid item xs={6}>
						<Typography variant='h3'>{title}</Typography>
					</Grid>
					<Grid item xs={6} container justify='flex-end'>
						<BasicButton handleClick={handleAddButton} color='primary'>
							{content.addButtonText}
						</BasicButton>
					</Grid>
				</Grid>
				<Grid className={classes.table} item xs={12}>
					<TableContainer>
						<Table stickyHeader aria-label='sticky table'>
							<TableHead>
								<TableRow>
									{columns.map((column) => (
										<TableCell
											key={column.id}
											align={column.align}
											style={{ minWidth: column.minWidth }}
										>
											{column.label}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{data
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row) => {
										return (
											<TableRow
												hover
												role='checkbox'
												tabIndex={-1}
												key={row.code}
											>
												{columns.map((column, index) => {
													const value = row[column.id];
													if (column.id === 'edit') {
														return (
															<TableCell key={index} align='center'>
																<BasicButton
																	color='primary'
																	handleClick={() => handleDelete(row.id)}
																>
																	{content.deleteButtonText}
																</BasicButton>
															</TableCell>
														);
													}
													return (
														<TableCell key={column.id} align={column.align}>
															{column.format && typeof value === 'number'
																? column.format(value)
																: value}
														</TableCell>
													);
												})}
											</TableRow>
										);
									})}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
				<Grid item xs={12}>
					<TablePagination
						rowsPerPageOptions={[10, 25, 100]}
						component='div'
						count={data.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
					/>
				</Grid>
			</Grid>
		);
	}
);

export default BasicTable;
