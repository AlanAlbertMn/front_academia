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
					label='Name'
					value={form[0].name.value}
					errorText={form[0].name.error}
					dispatchValue={dispatchValue}
					mapperKey='name'
				/>
			</Grid>
			<Grid item xs={7} className={classes.field}>
				<BasicInput
					label='Username'
					value={form[0].username.value}
					errorText={form[0].username.error}
					dispatchValue={dispatchValue}
					mapperKey='username'
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
					label='Password'
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
						Go back
					</BasicButton>
				</Grid>
			)}
		</Grid>
	);
}
