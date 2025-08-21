def get_ro_ho_users():
    try:
        connection_string = pymysql.connect(
            host=endpoint,
            user=username,
            password=password,
            database=database_name,
            port=3306,
        )
        live_connection_string = pymysql.connect(
            host=live_endpoint,
            user=live_username,
            password=live_password,
            database=live_database_name,
            port=3306
        )

        current_office = request.args.get("current_office")

        # Get login Ro Id
        ro_id_df = pd.read_sql("""SELECT ro_id FROM ams.office_master where office_code = %s""", connection_string, params=[current_office])
        logger.info(f"ro_id_df: {ro_id_df}")

        # Check if DataFrame is empty or ro_id is None/null
        if ro_id_df.empty or ro_id_df['ro_id'].iloc[0] is None:
            logger.info("Ro Id is null or empty")
            ro_id = None
        else:
            # Convert to numeric, then handle NaN values
            ro_id_numeric = pd.to_numeric(ro_id_df['ro_id'], errors='coerce')
            if pd.isna(ro_id_numeric.iloc[0]):
                logger.info("Ro Id conversion resulted in NaN")
                ro_id = None
            else:
                ro_id = str(int(ro_id_numeric.iloc[0]))
        
        logger.info(f"ro_id: {ro_id}")
            
        if ro_id is None or ro_id == '' or ro_id == 'null':
            logger.info("Ro Id is null")
            user_df = pd.read_sql("""
                SELECT id as user_id, name as user_name
                FROM AIC_MAIN.tbl_login WHERE ro_id IS NULL""", live_connection_string) 
            
        else:
            user_df = pd.read_sql("""
                SELECT id as user_id, name as user_name
                FROM AIC_MAIN.tbl_login where ro_id = %s """, live_connection_string, params=[ro_id])

        return jsonify({"status_code": 200, "results": user_df.to_dict(orient='records')}) 
        

    except Exception as e:
        line_number = traceback.extract_tb(e.__traceback__)[-1].lineno
        error_message = f"Exception occurred at line {line_number}: {str(e)}"
        logger.error(f"{error_message}")
        return jsonify({"success": False, "message": error_message}), 500

    finally:
        if connection_string:
            connection_string.close()
        if live_connection_string:
            live_connection_string.close()
        gc.collect()