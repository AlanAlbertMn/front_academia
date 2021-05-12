import React from 'react';
import { Grid, Typography } from '@material-ui/core';
//RootComponents
import BasicInput from '../../BasicComponents/BasicInput';
import BasicButton from '../../BasicComponents/BasicButton';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { content } from '../../Login/Login.utils';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const instructores = [
	'Instructor 1',
	'Instructor 2',
	'Instructor 3',
];

export function SesionContainer({
	matches,
	classes,
	form,
	views,
	dispatchViews,
	updateForm,
	next,
}) {
	const [instructorName, setInstructorName] = React.useState([]);

	const handleChange = (event) => {
		setInstructorName(event.target.value);
	};
	
	const dispatchValue = ({ key, value }) => {
		updateForm({ key, value, index: 0 });
	};

	return (
		<Grid
			className={matches ? classes.sesionContainer : classes.sesionContainerSm}
			container
			item
			md={8}
			spacing={0}
			alignItems='center'
			alignContent='center'
			justify='center'
		>
			<Grid item xs={7} className={classes.mb4}>
				<Typography variant='h4'>Registrar sesiones</Typography>
			</Grid>
			<Grid item container xs={7} className={classes.mb4}>
				<BasicInput
					value={form[0].activity.value}
					dispatchValue={dispatchValue}
					errorText={form[0].activity.error}
					label='Nombre de la actividad'
					mapperKey='name'
					name='name'
				/>
			</Grid>
			<Grid item container xs={7} className={classes.mb4}>
				<BasicInput
					value={form[0].duration.value}
					dispatchValue={dispatchValue}
					errorText={form[0].duration.error}
					label='Duracion de la sesión'
					mapperKey='duration'
					name='duration'
					type = 'number'
					min = '1'
				/>
			</Grid>
			<Grid item container xs={7} className={classes.mb4}>
				<InputLabel id="instructor-label">Instructor(es)</InputLabel>
				<Select
				labelId="instructor-label"
				id="instructors"
				name="instructors"
				mapperkey="instructors"
				multiple
				value={form[0].instructors.value}
				onChange={handleChange}
				input={<Input />}
				renderValue={(selected) => selected.join(', ')}
				MenuProps={MenuProps}
				>
					{instructores.map((name) => (
						<MenuItem key={name} value={name}>
						<Checkbox checked={instructorName.indexOf(name) > -1} />
						<ListItemText primary={name} />
						</MenuItem>
					))}
				</Select>
			</Grid>
			<Grid item container xs={7} className={classes.mb4}>
				<BasicInput
					value={form[0].date.value}
					dispatchValue={dispatchValue}
					errorText={form[0].date.error}
					label='Fecha de realización'
					name='date'
					mapperKey='date'
					type='date'
					InputLabelProps={{
						shrink: true,
					}}
				/>
			</Grid>
			<Grid item container xs={7} className={classes.mb4}>
				<BasicButton handleClick={next} color='primary' fullWidth={true}>
					Registrar
				</BasicButton>
			</Grid>
			{!views.splashScreen && (
				<Grid item container xs={7}>
					<BasicButton
						handleClick={() =>
							dispatchViews({
								login: false,
								signUp: false,
								splashScreen: true,
								otpScreen: false,
							})
						}
						color='primary'
						fullWidth={true}
					>
						Go back
					</BasicButton>
				</Grid>
			)}
		</Grid>
	);
}
