<script>
export default {
  created() {
    this.$store.setAuthToken(null);
    this.$router.push({ name: 'home' });
  }
}
</script>

