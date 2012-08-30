/*
 * Copyright (c) 2004-2010 SMG Co., Ltd. All Rights Reserved.
 * Please read the associated COPYRIGHTS file for more details.
 *
 * THE  SOFTWARE IS  PROVIDED BY  SMG Co., Ltd., WITHOUT  WARRANTY  OF
 * ANY KIND,  EXPRESS  OR IMPLIED,  INCLUDING BUT  NOT LIMITED  TO THE
 * WARRANTIES OF  MERCHANTABILITY,  FITNESS FOR A  PARTICULAR  PURPOSE
 * AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDER BE LIABLE FOR ANY
 * CLAIM, DAMAGES SUFFERED BY LICENSEE AS A RESULT OF USING, MODIFYING
 * OR DISTRIBUTING THIS SOFTWARE OR ITS DERIVATIVES.
 */
package jp.co.acroquest.endosnipe.web.dashboard.constants;

import jp.co.smg.endosnipe.common.logger.CommonLogMessageCodes;

/**
 * 繝ｭ繧ｰ繝｡繝�そ繝ｼ繧ｸ縺ｮ縺溘ａ縺ｮ螳壽焚繧ｯ繝ｩ繧ｹ縺ｧ縺吶�<br />
 * 
 * @author fujii
 */
public interface LogMessageCodes extends CommonLogMessageCodes
{

    // -------------------------------------------------------------------------
    // 蝓ｺ譛ｬ蜍穂ｽ懊Γ繝�そ繝ｼ繧ｸ繧ｳ繝ｼ繝�(00xx)
    // -------------------------------------------------------------------------
    /** 蜈･蜃ｺ蜉帑ｾ句､悶′逋ｺ逕�*/
    String IO_ERROR                                = "WEWD0001";

    // -------------------------------------------------------------------------
    // 髮ｻ譁�女菫｡繝｡繝�そ繝ｼ繧ｸ繧ｳ繝ｼ繝�(01xx)
    // -------------------------------------------------------------------------
    /** 繧､繝吶Φ繝�D縺梧悴謖�ｮ壹�縺ｾ縺溘�隱崎ｭ倥〒縺阪↑縺�*/
    String UNKNOWN_EVENT_ID                        = "WEWD0101";

    /** 騾夂衍隕∵ｱゅお繝ｼ繧ｸ繧ｧ繝ｳ繝�D縺梧悴謖�ｮ壹�縺ｾ縺溘�隱崎ｭ倥〒縺阪↑縺�*/
    String UNKNOWN_AGENT_ID                        = "WEWD0102";

    /** 騾夂衍蜈医げ繝ｩ繝肘D縺梧悴謖�ｮ壹�縺ｾ縺溘�隱崎ｭ倥〒縺阪↑縺�*/
    String UNKNOWN_GRAPH_ID                        = "WEWD0103";

    /** 騾夂衍隕∵ｱりｨ域ｸｬID縺梧悴謖�ｮ壹�縺ｾ縺溘�隱崎ｭ倥〒縺阪↑縺�*/
    String UNKNOWN_MEASUREMENT_TYPE                = "WEWD0104";

    /** 繧ｯ繝ｩ繧､繧｢繝ｳ繝医′謖�ｮ壹＆繧後※縺�↑縺�*/
    String NO_CLIENT_ID                            = "WEWD0105";

    /** 繝��繧ｿ蜿門ｾ苓ｦ∵ｱよ悄髢薙′譛ｪ謖�ｮ壹�縺ｾ縺溘�隱崎ｭ倥〒縺阪↑縺�*/
    String UNKNOWN_SPAN                            = "WEWD0106";

    /** 騾夂衍隕∵ｱゅΞ繝吶Ν縺梧悴謖�ｮ壹�縺ｾ縺溘�隱崎ｭ倥〒縺阪↑縺�*/
    String UNKNOWN_ALARM_LEVEL                     = "WEWD0107";

    /** 繧｢繝ｩ繝ｼ繝��蛟区焚縺梧悴謖�ｮ壹�縺ｾ縺溘�繝輔か繝ｼ繝槭ャ繝医お繝ｩ繝ｼ */
    String UNKNOWN_ALARM_COUNT                     = "WEWD0108";

    /** 蜿門ｾ励☆繧九ヵ繧｡繧､繝ｫ蜷阪′譛ｪ謖�ｮ壹�縺ｾ縺溘�隱崎ｭ倥〒縺阪↑縺�*/
    String UNKNOWN_FILE_NAME                       = "WEWD0109";

    /** Javelin繝ｭ繧ｰ縺ｮ蜿門ｾ励↓螟ｱ謨�*/
    String FAIL_GET_JVNLOG                         = "WEWD0110";

    /** 險域ｸｬ遞ｮ蛻･荳�ｦｧ縺悟叙蠕励〒縺阪↑縺�*/
    String NO_MEASUREMENT_SETTING                  = "WEWD0121";

    /** SQL螳溯｡梧凾縺ｫ萓句､悶′逋ｺ逕�*/
    String SQL_EXCEPTION                           = "EEWD0151";

    // -------------------------------------------------------------------------
    // 騾壻ｿ｡髢｢騾｣繝｡繝�そ繝ｼ繧ｸ繧ｳ繝ｼ繝�(02xx)
    // -------------------------------------------------------------------------
    /** 騾壻ｿ｡蜃ｦ逅�〒萓句､悶′逋ｺ逕�*/
    String COMMUNICATION_ERROR                     = "WEWD0201";

    /** 繧ｭ繝･繝ｼ繧ｵ繧､繧ｺ繧定ｶ�℃ */
    String QUEUE_FULL                              = "WEWD0202";

    /** 繝ｬ繧ｹ繝昴Φ繧ｹ縺悟叙蠕励〒縺阪↑縺�� */
    String CANNOT_GET_RESPONCE                     = "WEWD0203";

    /** Client縺ｫ騾∽ｻ倥☆繧九Γ繝�そ繝ｼ繧ｸ縲�*/
    String RESPONCE_MESSAGE_CODE                   = "DEWD0204";

    /** Comet蜃ｦ逅�〒萓句､悶′逋ｺ逕�*/
    String COMET_ERROR                             = "EEWD0205";

    /** 繧ｳ繝｡繝�ヨ繧､繝吶Φ繝医�繧ｻ繝�す繝ｧ繝ｳ迥ｶ諷玖｡ｨ遉ｺ縲�*/
    String SESSION_INFORMATION                     = "DEWD0206";

    // -------------------------------------------------------------------------
    // DataCollector髢｢騾｣繝｡繝�そ繝ｼ繧ｸ繧ｳ繝ｼ繝�(04xx)
    // -------------------------------------------------------------------------
    /** 繝励Ο繝代ユ繧｣繝輔ぃ繧､繝ｫ縺瑚ｦ九▽縺九ｉ縺ｪ縺�*/
    String CANNOT_FIND_PROPERTY                    = "EEWD0401";

    /** 繝帙せ繝域ュ蝣ｱ縺瑚ｦ九▽縺九ｉ縺ｪ縺�*/
    String CANNOT_FIND_HOST                        = "EEWD0402";

    /** 繝代Λ繝｡繝ｼ繧ｿ縺ｮ隗｣譫舌↓螟ｱ謨�*/
    String FAIL_TO_READ_PARAMETER                  = "EEWD0403";

    /** 繝��繧ｿ繝吶�繧ｹ諠��縺ｮ蜿門ｾ励↓螟ｱ謨�*/
    String FAIL_READ_DB_SETTING                    = "WEWD0404";

    /** 繝��繧ｿ繝吶�繧ｹ蜷阪�蜿門ｾ励↓螟ｱ謨�*/
    String FAIL_READ_DB_NAME                       = "WEWD0405";

    // -------------------------------------------------------------------------
    // PerformanceDoctor髢｢騾｣繝｡繝�そ繝ｼ繧ｸ繧ｳ繝ｼ繝�(05xx)
    // -------------------------------------------------------------------------
    /** Javelin繝ｭ繧ｰ縺ｮ隗｣譫舌↓螟ｱ謨�*/
    String FAIL_PARSE_JVNLOG                       = "WEWD0501";

    /** 繧ｵ繝昴�繝亥ｯｾ雎｡螟悶�譁�ｭ励さ繝ｼ繝峨ｒ謖�ｮ�*/
    String UNSUPPORTED_CHARSET                     = "EEWD0502";

    /** PerformaceDoctor縺ｮ繝ｫ繝ｼ繝ｫ縺瑚ｦ九▽縺九ｉ縺ｪ縺�*/
    String CANNOT_FIND_PERFRULE                    = "WEWD0503";

    /** PerformaceDoctor縺ｮ繝ｫ繝ｼ繝ｫ逕滓�縺ｫ螟ｱ謨�*/
    String FAIL_TO_CREATE_PERFRULE                 = "WEWD0504";

    /** 謖�ｮ壹＠縺殍vn繝ｭ繧ｰ縺瑚ｦ九▽縺九ｉ縺ｪ縺�*/
    String UNKNOWN_LOG_FILE_NAME                   = "WEWD0505";

    // -------------------------------------------------------------------------
    // ENdoSnipeReportor髢｢騾｣繝｡繝�そ繝ｼ繧ｸ繧ｳ繝ｼ繝�(06xx)
    // -------------------------------------------------------------------------
    /** 繝ｬ繝昴�繝亥�蜉帛ｯｾ雎｡縺ｮ繧ｨ繝ｼ繧ｸ繧ｧ繝ｳ繝�D縺梧悴謖�ｮ�*/
    String UNKNOWN_REPORT_AGENT_ID                 = "EEWD0601";

    /** 繝ｬ繝昴�繝亥�蜉帛ｯｾ雎｡縺ｮ繝ｬ繝昴�繝医ヵ繧｡繧､繝ｫ縺悟ｭ伜惠縺励↑縺�*/
    String UNKNOWN_REPORT_FILE_NAME                = "EEWD0602";

    /** 繝ｬ繝昴�繝亥�蜉帛ｯｾ雎｡縺ｮ繝ｬ繝昴�繝亥�蜉帶悄髢薙ｒ陦ｨ遉ｺ縺吶ｋ */
    String REPORT_FILE_DURATION                    = "DEWD0603";

    /** 繝ｬ繝昴�繝亥�蜉帶悄髢薙�繝輔か繝ｼ繝槭ャ繝医′荳肴ｭ｣縲�*/
    String UNSUPPORTED_REPORT_FILE_DURATION_FORMAT = "WEWD0604";

}
