import React from 'react';
import { Grid, Typography } from '@material-ui/core';
//RootComponents
import BasicInput from '../../BasicComponents/BasicInput';
import BasicButton from '../../BasicComponents/BasicButton';
import { content } from '../Login.utils';
export function SignUpContainer({
	matches,
	classes,
	form,
	views,
	dispatchViews,
	updateForm,
	next,
}) {
	const dispatchValue = ({ key, value }) => {
		updateForm({ key, value, index: 0 });
	};

	return (
		<Grid
			className={matches ? classes.loginContainer : classes.loginContainerSm}
			container
			item
			md={8}
			alignItems='center'
			alignContent='center'
			justify='center'
		>
			<Grid item xs={7} className={classes.mb4}>
				<Typography variant='h4'>{content.text.signUpForm}</Typography>
			</Grid>
			<Grid item xs={7} className={classes.field}>
				<BasicInput
					label='Nombre'
					value={form[0].nombre.value}
					errorText={form[0].nombre.error}
					dispatchValue={dispatchValue}
					mapperKey='nombre'
				/>
			</Grid>
			<Grid item xs={7} className={classes.field}>
				<BasicInput
					label='Apellidos'
					value={form[0].apellidos.value}
					errorText={form[0].apellidos.error}
					dispatchValue={dispatchValue}
					mapperKey='apellidos'
				/>
			</Grid>
			<Grid item xs={7} className={classes.field}>
				<BasicInput
					label='Teléfono'
					value={form[0].telefono.value}
					errorText={form[0].telefono.error}
					dispatchValue={dispatchValue}
					mapperKey='telefono'
				/>
			</Grid>

			<Grid item xs={7} className={classes.field}>
				<BasicInput
					label='Email'
					value={form[0].email.value}
					errorText={form[0].email.error}
					dispatchValue={dispatchValue}
					mapperKey='email'
				/>
			</Grid>
			<Grid item xs={7} className={classes.field}>
				<BasicInput
					label='Contraseña'
					value={form[0].password.value}
					errorText={form[0].password.error}
					type='password'
					dispatchValue={dispatchValue}
					mapperKey='password'
				/>
			</Grid>
			<Grid item container xs={7} className={classes.mb4}>
				<BasicButton handleClick={next} color='primary' fullWidth={true}>
					{content.text.signUpButton}
				</BasicButton>
			</Grid>
			{matches && (
				<Grid item container xs={7} className={classes.mb4}>
					<BasicButton
						handleClick={() =>
							dispatchViews({
								login: true,
								splashScreen: true,
								signUp: false,
								otpScreen: false,
							})
						}
						color='primary'
						fullWidth={true}
					>
						{content.text.loginButton}
					</BasicButton>
				</Grid>
			)}
			{!views.splashScreen && (
				<Grid item container xs={7}>
					<BasicButton
						handleClick={() =>
							dispatchViews({
								login: true,
								splashScreen: false,
								signUp: false,
								otpScreen: false,
							})
						}
						color='primary'
						fullWidth={true}
					>
						Regresar
					</BasicButton>
				</Grid>
			)}
		</Grid>
	);
}
