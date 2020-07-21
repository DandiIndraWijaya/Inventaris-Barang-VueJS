<template>
	<div id="loggout">
		
	</div>
</template>

<script>
export default{
	created(){
		this.$store.dispatch('destroyToken').then(() => {
                this.$router.push({ path: '/login' })
               });
	}
}
</script>



