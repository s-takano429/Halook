package jp.co.acroquest.endosnipe.web.dashboard.controller;

import java.util.List;
import java.util.Locale;

import jp.co.acroquest.endosnipe.web.dashboard.dto.TreeMenuDto;
import jp.co.acroquest.endosnipe.web.dashboard.service.TreeMenuService;
import net.arnx.jsonic.JSON;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class InitController
{

    @Autowired
    /** ツリーメニューサービス */
    private TreeMenuService treeMenuService;

    /**
     * Simply selects the home view to render by returning its name.
     */
    @RequestMapping(value = "/init", method = RequestMethod.GET)
    public String initialize(final Locale locale, final Model model)
    {
        List<TreeMenuDto> treeMenuDtoList = this.treeMenuService.initialize();
        model.addAttribute("treeData", JSON.encode(treeMenuDtoList));

        return "Prototype";
    }
}
