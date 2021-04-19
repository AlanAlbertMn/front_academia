import React from 'react';
import { Grid, Typography } from '@material-ui/core';
//RootComponents
import BasicInput from '../../BasicComponents/BasicInput';
import BasicButton from '../../BasicComponents/BasicButton';
import { content } from '../Login.utils';
export function LoginContainer({
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
			spacing={0}
			alignItems='center'
			alignContent='center'
			justify='center'
		>
			<Grid item xs={7} className={classes.mb4}>
				<Typography variant='h4'>{content.text.loginForm}</Typography>
			</Grid>
			<Grid item container xs={7} className={classes.mb4}>
				<BasicInput
					value={form[0].login.value}
					dispatchValue={dispatchValue}
					errorText={form[0].login.error}
					label={content.text.loginInput}
					mapperKey='login'
					name='login'
				/>
			</Grid>
			<Grid item container xs={7} className={classes.mb4}>
				<BasicInput
					value={form[0].password.value}
					dispatchValue={dispatchValue}
					errorText={form[0].password.error}
					label={content.text.passwordInput}
					name='password'
					mapperKey='password'
					type='password'
				/>
			</Grid>
			<Grid item container xs={7} className={classes.mb4}>
				<BasicButton handleClick={next} color='primary' fullWidth={true}>
					{content.text.loginButton}
				</BasicButton>
			</Grid>
			<Grid item container xs={7} className={classes.mb4}>
				<BasicButton
					handleClick={() =>
						dispatchViews({
							login: false,
							signUp: true,
							splashScreen: matches ? true : false,
							otpScreen: false,
						})
					}
					color='primary'
					fullWidth={true}
				>
					{content.text.signUpButton}
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
