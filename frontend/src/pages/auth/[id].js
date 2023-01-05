
const loginCode = () => {
    useEffect(() => {
        if (router?.query?.id) findRun(router.query.id, callbackRun);
      }, [router]);
}